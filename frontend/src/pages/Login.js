import { useState, useContext } from "react";
import { login } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login: loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const response = await login(email, password);
        if (response.token) {
            loginUser(response);
            navigate("/dashboard");
        } else {
            alert(response.message);
        }
    };
    
    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Connexion</h2>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <Button onClick={handleLogin} text="Se connecter" className="button"/>
                <div className="link">
                    <a href="/register">Pas de compte ? S'inscrire</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
