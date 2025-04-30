import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
    const { me } = useContext(AuthContext);
    const getLinkStyle = ({ isActive }) => isActive ? 'navbar-activeLink' : 'navbar-link';
    const getProfilStyle = ({ isActive }) => isActive ? 'profilIconActive' : 'profilIcon';

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/home" className="navbar-logo">MonApp</Link>
            </div>

            <div className="navbar-center">
                <NavLink to="/dashboard" className={getLinkStyle}>Dashboard</NavLink>

                {me?.accountType === "acheteur" && (
                    <NavLink to="/dossier" className={getLinkStyle}>Mon dossier</NavLink>
                )}
                {me?.accountType === "vendeur" && (
                    <NavLink to="/dossiers" className={getLinkStyle}>Les dossiers</NavLink>
                )}
                {(me?.accountType === "vendeur" || me?.accountType === "acheteur") && (
                    <>
                        <NavLink to="/calendrier" className={getLinkStyle}>Calendrier</NavLink>
                        <NavLink to="/mes-demarches" className={getLinkStyle}>Mes démarches</NavLink>
                    </>
                )}
                {me?.accountType === "admin" && (
                    <NavLink to="/gestioncomptes" className={getLinkStyle}>Gérer les comptes</NavLink>
                )}
            </div>

            <div className="navbar-right">
                {!me && (
                    <>
                        <NavLink to="/register" className="navbar-button white">Inscription</NavLink>
                        <NavLink to="/login" className="navbar-button black">Connexion</NavLink>
                    </>
                )}
                {me && (
                    <NavLink to="/profil" className={getProfilStyle}>
                        <FaUserCircle size={30} />
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
