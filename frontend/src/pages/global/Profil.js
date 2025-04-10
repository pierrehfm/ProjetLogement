import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import "../../styles/Profil.css";
import { updateUser } from "../../api/user";
import { useNavigate } from "react-router-dom";

const Profil = () => {
    const { me, token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const [formData, setFormData] = useState({
        firstname: me?.firstname || "",
        lastname: me?.lastname || "",
        birthDate: me?.birthDate || "",
        gender: me?.gender || "",
    });

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
                    <div className="input-group">
                        <Input name="lastname" label="Nom" value={formData.lastname} onChange={handleChange} />
                        <Input name="firstname" label="Prénom" value={formData.firstname} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <Input name="birthDate" label="Date de naissance" value={formData.birthDate} onChange={handleChange} />
                        <Select
                            label="Genre" 
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            placeholder="Genre"
                            options={[
                                { value: "homme", label: "Homme" },
                                { value: "femme", label: "Femme" },
                                { value: "autre", label: "Autre" }
                            ]}
                        />
                    </div>
                    <Button onClick={handleSubmit} text="Enregistrer" />
                </div>
                <div className="profil-right">
                    <h2>Abonnements</h2>
                    <Button onClick={handleLogout} text="Déconnexion" />
                </div>
            </div>
        </div>
    );
};

export default Profil;
