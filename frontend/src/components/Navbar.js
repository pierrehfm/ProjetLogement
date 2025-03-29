import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";
import { FaUserCircle } from "react-icons/fa"; // Icône de profil

const Navbar = () => {
    const { me } = useContext(AuthContext);
    const getLinkStyle = ({ isActive }) => isActive ? 'navbar-activeLink' : 'navbar-link';
    const getProfilStyle = ({ isActive }) => isActive ? 'profilIconActive' : 'profilIcon';

    return (
        <nav className="navbar">
            {/* Logo MonApp qui redirige vers la page Home */}
            <NavLink to="/" className="logo">
                MonApp
            </NavLink>
            <div className="links">
                <NavLink to="/dashboard" className={getLinkStyle}>Dashboard</NavLink>
                {me?.accountType === "acheteur" && (
                    <NavLink to="/dossier" className={getLinkStyle}>Mon dossier</NavLink>
                )}
                {me?.accountType === "vendeur" && (
                    <NavLink to="/dossiers" className={getLinkStyle}>Les dossiers</NavLink>
                )}
                <NavLink to="/calendrier" className={getLinkStyle}>Calendrier</NavLink>
                <NavLink to="/mes-demarches" className={getLinkStyle}>Mes démarches</NavLink>
            </div>

            <div className="auth-links">
                {me ? (
                    <NavLink to="/profil" className={getProfilStyle}>
                        <FaUserCircle size={35} className="faProfilIcon" />
                    </NavLink>
                ) : (
                    <>
                        <NavLink to="/register" className="signup-button">Inscription</NavLink>
                        <NavLink to="/login" className="login-button">Connexion</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
