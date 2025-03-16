import { createContext, useState, useEffect } from "react";
import { getMe } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [me, setMe] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);
    console.log("test 1");
    console.log(me);

    useEffect(() => {
        if (token) {
            fetchMe();
        } else {
            setLoading(false);
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
        if (!token) return;
        setLoading(true);
        try {
            const meData = await getMe(token);
            setMe(meData);
        } catch (error) {
            logout();
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ me, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
