import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [registeredUser, setRegisteredUser] = useState(null);
    const [user, setUser] = useState(null);

    const register = (nome, telefone, email, password) => {
        setRegisteredUser({ nome, telefone, email, password });
    }
    const updateUser = (nome, telefone, email) => {
        setUser({ nome, telefone, email });
    }

    const login = (email, password) => {
        if (email === "riichardd.08@gmail.com" && password === "27072006") {
            setUser({ nome: "Richard", email: email, telefone: "21998228014" });
            return true;
        }
        if (registeredUser && email === registeredUser.email && password === registeredUser.password) {
            setUser({nome: registeredUser.nome, email: email, telefone: registeredUser.telefone});
            return true;
        }
        return false;
    };
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, registeredUser, register, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}
