import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/Profil.css";
import { updateUser } from "../api/user";

const Profil = () => {
    const { me, token } = useContext(AuthContext);

    // État local pour les champs modifiables
    const [formData, setFormData] = useState({
        firstname: me?.firstname || "",
        lastname: me?.lastname || "",
        birthDate: me?.birthDate || "",
        gender: me?.gender || "",
    });

    // Gestion des changements d'input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const result = await updateUser(token, formData);
        alert(result.message);
    };

    return (
        <div>
            <Navbar />
            <div className="profil-container">
                <div className="profil-left">
                    <h2>Informations personnelles</h2>
                    <Input name="lastname" placeholder="Nom" value={formData.lastname} onChange={handleChange} />
                    <Input name="firstname" placeholder="Prénom" value={formData.firstname} onChange={handleChange} />
                    <Input name="birthDate" placeholder="Date de naissance" value={formData.birthDate} onChange={handleChange} />
                    <Input name="gender" placeholder="Genre" value={formData.gender} onChange={handleChange} />
                    <Button onClick={handleSubmit} text="Enregistrer" />
                </div>
                <div className="profil-right">
                    <h2>Abonnements</h2>
                </div>
            </div>
        </div>
    );
};

export default Profil;
