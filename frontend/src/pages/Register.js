import { useState } from "react";
import { register } from "../api/auth";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import '../styles/Register.css';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [accountType, setAccountType] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        const response = await register(firstname, lastname, gender, birthDate, accountType, email, password);
        if (response.message === "Utilisateur créé !") {
            navigate("/login");
        } else {
            alert(response.message);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form">
                <h2>Inscription</h2>
                <Input type="text" name="firstname" placeholder="Prénom" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                <Input type="text" name="lastname" placeholder="Nom" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                <Select
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    placeholder="Sélectionner un genre"
                    options={[
                        { value: "homme", label: "Homme" },
                        { value: "femme", label: "Femme" },
                        { value: "autre", label: "Autre" }
                    ]}
                />
                <Input type="date" name="birthDate" placeholder="Date de naissance" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                <Select
                    name="accountType"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    placeholder="Sélectionner un type"
                    options={[
                        { value: "acheteur", label: "Acheteur" },
                        { value: "vendeur", label: "Vendeur" },
                        { value: "autre", label: "Autre" }
                    ]}
                />
                <Input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" name="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button text="S'inscrire" onClick={handleRegister} />
                <div className="link">
                    <a href="/login">Déjà un compte ? Se connecter</a>
                </div>
            </form>
        </div>
    );
};

export default Register;
