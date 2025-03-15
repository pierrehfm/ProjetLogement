import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";
import { FaUserCircle } from "react-icons/fa"; // Icône de profil

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const getLinkStyle = ({ isActive }) => isActive ? 'navbar-activeLink' : 'navbar-link';
    const getProfilStyle = ({ isActive }) => isActive ? 'profilIconActive' : 'profilIcon';

    return (
        <nav className="navbar">
            <h2 className="logo">MonApp</h2>
            <div className="links">
                <NavLink to="/dashboard" className={getLinkStyle} end>
                    Dashboard
                </NavLink>
                <NavLink to="/dossier" className={getLinkStyle}>
                    Mon dossier
                </NavLink>
                <NavLink to="/calendrier" className={getLinkStyle}>
                    Calendrier
                </NavLink>
                <NavLink to="/mes-demarches" className={getLinkStyle}>
                    Mes démarches
                </NavLink>
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
