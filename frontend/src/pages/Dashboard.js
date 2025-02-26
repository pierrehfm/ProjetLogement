import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login"); // Redirection vers la page de connexion
    };

    return (
        <div>
            <Navbar />
            <h1>Bienvenue {user ? `${user.firstname} ${user.lastname}` : "Utilisateur"} !</h1>
            {user && (
                <div>
                    <p>Email: {user.email}</p>
                    <p>Type de compte: {user.accountType}</p>
                </div>
            )}
            <Button onClick={handleLogout} text="Déconnexion" />
        </div>
    );
};

export default Dashboard;
