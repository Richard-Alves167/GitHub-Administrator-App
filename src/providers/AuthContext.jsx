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
        case "set_registeredUser":
            return {...data, registeredUser: action.payload};
        default:
            return data;
    }
} 

export default function AuthProvider({ children }) {
    const [data, dispatch] = useReducer(authReducer, initialData);

    const register = (nome, email, password) => {
    console.log("Registrando:", { nome, email, password });

    dispatch({
        type: "set_registeredUser",
        payload: { nome, email, password }
    });
};

    const updateUser = (nome, telefone, email) => dispatch({
        type: "set_user", payload: {nome, email}
    });

    const login = (email, password) => {
        if (data.registeredUser && email === data.registeredUser.email && password === data.registeredUser.password) {
            dispatch({type: "set_user", payload: { nome: data.registeredUser.nome, email: email }});
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
