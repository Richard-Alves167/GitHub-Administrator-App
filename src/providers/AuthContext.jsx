import React, { createContext, useContext, useState, useReducer } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const initialData = {
    user: null,
    registeredUser: null,
}

function authReducer(data, action) {
    switch(action.type) {
        case "set_user":
            return {...data, user: action.payload};
        case "set_resgisteredUser":
            return {...data, registeredUser: action.payload};
        default:
            return data;
    }
} 

export default function AuthProvider({ children }) {
    const [data, dispatch] = useReducer(authReducer, initialData);

    const register = (nome, telefone, email, password) => dispatch({
        type: "set_resgisteredUser", payload: {nome, telefone, email, password}
    });

    const updateUser = (nome, telefone, email) => dispatch({
        type: "set_user", payload: {nome, telefone, email}
    });

    /*const login = (email, password) => {
        if (registeredUser && email === registeredUser.email && password === registeredUser.password) {
            dispatch({type: "set_user", payload: { nome: registeredUser.nome, email: email, telefone: registeredUser.telefone }});
            return true;
        }

        return false;
    };*/
    const login = (email, password) => {
        if (email === "r" && password === "1") {
            dispatch({type: "set_user", payload: { nome: "Richard", email: email, telefone: "21998228013" }});
            return true;
        }
        return false;
    };

    const logout = () => {
        dispatch({type: "set_user", payload: null});
    };

    return (
        <AuthContext.Provider value={{ data, register, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}
