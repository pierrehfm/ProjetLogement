import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Button from "./Button";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav style={styles.navbar}>
            <h2 style={styles.logo}>MonApp</h2>
            <div style={styles.links}>
                <Link to="/home" style={styles.link}>Accueil</Link>
                {user && <Link to="/dashboard" style={styles.link}>Dashboard</Link>}
            </div>
            {user ? (
                <Button onClick={logout} text="Déconnexion" />
            ) : (
                <Link to="/login" style={styles.link}>Connexion</Link>
            )}
        </nav>
    );
};

const styles = {
    navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", background: "#5a67d8", color: "white" },
    logo: { fontSize: "1.5em", fontWeight: "bold" },
    links: { display: "flex", gap: "15px" },
    link: { color: "white", textDecoration: "none", fontSize: "1.2em" }
};

export default Navbar;
