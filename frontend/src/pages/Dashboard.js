import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    const { me, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login"); // Redirection vers la page de connexion
    };

    return (
        <div>
            <Navbar />
            <h1>Bienvenue {me ? `${me.firstname} ${me.lastname}` : "Utilisateur"} !</h1>
            {me && (
                <div>
                    <p>Email: {me.email}</p>
                    <p>Type de compte: {me.accountType}</p>
                </div>
            )}
            <Button onClick={handleLogout} text="Déconnexion" />
        </div>
    );
};

export default Dashboard;
