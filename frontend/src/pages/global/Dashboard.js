import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/Button";
import "../../styles/Dashboard.css";
import Pub from "../../components/Pub"; 

const Dashboard = () => {
    const { me } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div>
            
            <div className="dashboard-container">
                <div className="welcome-section">
                    <h1>Bienvenue {me ? `${me.firstname} ${me.lastname}` : "Utilisateur"} !</h1>
                    <p className="intro-text">
                        N'hésitez pas à explorer les différentes sections pour en savoir plus !
                    </p>
                </div>

                <div className="content-grid">
                    <div className="links-card">
                        <h2>Accès rapide</h2>
                        <ul>
                            <li onClick={() => navigate("/faq")} className="link-item">Notre FAQ</li>
                            <li onClick={() => navigate("/conditions")} className="link-item">Conditions générales d'utilisation</li>
                            <li onClick={() => navigate("/contact")} className="link-item">Nous contacter</li>
                        </ul>
                    </div>

                    <div className="pub-card">
                        <Pub />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
