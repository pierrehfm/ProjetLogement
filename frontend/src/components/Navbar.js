import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { me } = useContext(AuthContext);
    const getLinkStyle = ({ isActive }) => isActive ? 'navbar-activeLink' : 'navbar-link';
    const getProfilStyle = ({ isActive }) => isActive ? 'profilIconActive' : 'profilIcon';

    return (
        <nav className="navbar">
            <Link to="/home">
                <h2>LocDossier</h2>
            </Link>
            <div className="links">
                <NavLink to="/dashboard" className={getLinkStyle}>Dashboard</NavLink>
                {me.accountType === "acheteur" && (
                    <NavLink to="/dossier" className={getLinkStyle}>Mon dossier</NavLink>
                )}
                {me.accountType === "vendeur" && (
                    <NavLink to="/dossiers" className={getLinkStyle}>Les dossiers</NavLink>
                )}
                {(me.accountType === "vendeur" || me.accountType === "acheteur") && (
                    <NavLink to="/calendrier" className={getLinkStyle}>Calendrier</NavLink>
                )}
                {(me.accountType === "vendeur" || me.accountType === "acheteur") && (
                    <NavLink to="/mes-demarches" className={getLinkStyle}>Mes démarches</NavLink>
                )}
                {me.accountType === "admin" && (
                    <NavLink to="/gestioncomptes" className={getLinkStyle}>Gerer les comptes</NavLink>
                )}
            </div>
            <div>
                <NavLink to="/profil" className={getProfilStyle}>
                    <FaUserCircle size={35} className="faProfilIcon" />
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;