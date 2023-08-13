import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [auth, setAuth] = useState(localStorage.getItem("id"));

    const value = {auth, setAuth};

    useEffect(() => {
        if (auth) {
            localStorage.setItem("id", auth);
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}