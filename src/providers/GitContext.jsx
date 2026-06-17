import React, { createContext, useContext, useReducer, useRef } from 'react';
import { buscarUsuarioGithub, buscarRepositoriosGithub, buscarIssuesGithub, atualizarStatusIssue } from '../services/githubService';

const GitContext = createContext(null);

export function useGit() {
    const context = useContext(GitContext);
    if (!context) {
        throw new Error("useGit precisa estar dentro de um GitProvider");
    }
    return context;
}

const valoresIniciais = {
    token: "",
    usuarioGithub: null,
    repositorios: [],
    issues: []
};

function gitReducer(valores, action) {
    switch (action.type) {
        case "set_token":
            return { ...valores, token: action.payload };
        case "set_usuario_github":
            return { ...valores, usuarioGithub: action.payload };
        case "set_repositorios":
            return { ...valores, repositorios: action.payload.page === 1 ? action.payload.repositorios : [...valores.repositorios, ...action.payload.repositorios] };
        case "set_issues":
            return { ...valores, issues: action.payload };
        case "update_issue_status":
            return {
                ...valores,
                issues: valores.issues.map((item) =>
                    item.id === action.payload.issueId
                        ? { ...item, state: action.payload.status }
                        : item
                ),
            };
        case "update_issue":
            return {
                ...valores,
                issues: valores.issues.map((item) =>
                    item.id === action.payload.issueId
                        ? action.payload.issue
                        : item
                ),
            };
        default:
            return valores;
    }
}

export default function GitProvider({ children }) {
    const [valores, dispatch] = useReducer(gitReducer, valoresIniciais);
    const issuesFetchIdRef = useRef(0);

    function handleSetToken(token) {
        dispatch({ type: "set_token", payload: token });
    }

    async function carregarUsuario(token) {
        const data = await buscarUsuarioGithub(token);

        if (data) {
            dispatch({
                type: "set_usuario_github",
                payload: data,
            });
        }
    }

    async function carregarRepositorios(token, page = 1) {
        const data = await buscarRepositoriosGithub(page, token);

        dispatch({
            type: "set_repositorios",
            payload: {
                repositorios: data,
                page,
            },
        });
    }

    async function carregarIssues(token) {
        const fetchId = ++issuesFetchIdRef.current;
        const data = await buscarIssuesGithub(token);

        if (fetchId !== issuesFetchIdRef.current) return;

        dispatch({
            type: "set_issues",
            payload: data,
        });
    }

    async function handleAtualizarStatus(issue, novoStatus) {
        const statusAnterior = issue.state;

        dispatch({
            type: "update_issue_status",
            payload: { issueId: issue.id, status: novoStatus },
        });

        const issueAtualizada = await atualizarStatusIssue(issue, novoStatus, valores.token);

        if (issueAtualizada?.id) {
            dispatch({
                type: "update_issue",
                payload: {
                    issueId: issue.id,
                    issue: { ...issue, ...issueAtualizada, repository: issue.repository },
                },
            });
        } else {
            dispatch({
                type: "update_issue_status",
                payload: { issueId: issue.id, status: statusAnterior },
            });
        }
    }

    async function carregarDadosGithub(userToken) {
        handleSetToken(userToken);
        await carregarUsuario(userToken);
        await carregarRepositorios(userToken);
        await carregarIssues(userToken);
    }

    return (
        <GitContext.Provider
            value={{
                token: valores.token,
                usuarioGithub: valores.usuarioGithub,
                repositorios: valores.repositorios,
                issues: valores.issues,
                carregarDadosGithub,
                carregarRepositorios,
                carregarIssues,
                atualizarStatusIssue: handleAtualizarStatus,
            }}
        >{children}</GitContext.Provider>
    );
}