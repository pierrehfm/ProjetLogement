import { createContext, useState, useEffect } from "react";
import { getMe } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [me, setMe] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            fetchMe();
        }
    }, [token]);

    const login = (data) => {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        fetchMe();
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setMe(null);
    };

    const fetchMe = async () => {
        try {
            const meData = await getMe(token);
            setMe(meData);
        } catch (error) {
            console.error("Erreur lors de la récupération des infos utilisateur :", error);
            logout();
        }
    };

    return (
        <AuthContext.Provider value={{ me, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
