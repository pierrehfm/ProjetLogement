import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import "../../styles/Dashboard.css";
import Pub from "../../components/Pub"; 

const Dashboard = () => {
    const { me } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className="dashboard-container">
                <div className="main-content">
                    <h1>Bienvenue {me ? `${me.firstname} ${me.lastname}` : "Utilisateur"} !</h1>
                </div>
                <div className="main-div">Main div (50%)</div>
                <div className="flex-row">
                    
                    <div className="side-div">
                        Notre FAQ<br/>
                        Conditions générales d'utilisation<br/>
                        Nous contacter
                    </div>
                    <div className="side-div">
                        <Pub />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Dashboard;
