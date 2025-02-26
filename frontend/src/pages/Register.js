import { useState } from "react";
import { register } from "../api/auth";
import Input from "../components/Input";
import Button from "../components/Button";
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
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold">Inscription</h2>
            <Input type="text" placeholder="Prénom" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            <Input type="text" placeholder="Nom" value={lastname} onChange={(e) => setLastname(e.target.value)} />
            <Input type="text" placeholder="Genre" value={gender} onChange={(e) => setGender(e.target.value)} />
            <Input type="date" placeholder="Date de naissance" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
            <Input type="text" placeholder="Type de compte" value={accountType} onChange={(e) => setAccountType(e.target.value)} />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button text="S'inscrire" onClick={handleRegister} />
        </div>
    );
};

export default Register;
