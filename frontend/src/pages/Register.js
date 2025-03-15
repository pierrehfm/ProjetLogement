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
                <div className="input-group">
                    <Input label="Prénom" type="text" name="firstname" placeholder="Prénom" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    <Input label="Nom" type="text" name="lastname" placeholder="Nom" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                </div>
                <Input label="Email" type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className="input-group">
                    <Select
                        label="Genre" 
                        name="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        placeholder="Genre"
                        options={[
                            { value: "homme", label: "Homme" },
                            { value: "femme", label: "Femme" },
                            { value: "autre", label: "Autre" }
                        ]}
                    />
                    <Input label="Date de naissance" type="date" name="birthDate" placeholder="Date de naissance" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                </div>
                <div className="input-group">
                    <Select
                        label="Type de compte" 
                        name="accountType"
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                        placeholder="Type"
                        options={[
                            { value: "acheteur", label: "Acheteur" },
                            { value: "vendeur", label: "Vendeur" },
                            { value: "autre", label: "Autre" }
                        ]}
                    />
                    <Input label="Mot de passe" type="password" name="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button text="S'inscrire" onClick={handleRegister} />
                <div className="link">
                    <a href="/login">Déjà un compte ? Se connecter</a>
                </div>
            </form>
        </div>
    );
};

export default Register;
