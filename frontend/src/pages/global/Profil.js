import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import FileButton from "../../components/FileButton";
import Select from "../../components/Select";
import SubscriptionCard from "../../components/SubscriptionCard";
import { updateUser } from "../../api/user";
import { updatePub, getPub } from "../../api/pub";
import "../../styles/Profil.css";

const Profil = () => {
    const { me, token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: me?.firstname || "",
        lastname: me?.lastname || "",
        birthDate: me?.birthDate || "",
        gender: me?.gender || "",
    });

    const [pubData, setPubData] = useState({
        link: "",
        image: "", // nom de fichier ou URL
    });

    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        const fetchPub = async () => {
            try {
                const pub = await getPub(token);
                setPubData(pub);
            } catch (err) {
                console.error("Erreur lors du chargement de la publicité", err);
            }
        };
        fetchPub();
    }, [token]);

    const handleUserChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUserSubmit = async () => {
        const result = await updateUser(token, formData);
        alert(result.message);
    };

    const handlePubSubmit = async () => {
        const form = new FormData();
        form.append("link", pubData.link);
        if (newImage) {
            form.append("image", newImage);
        }

        const result = await updatePub(token, form);
        alert(result.message);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div>
            <Navbar />
            <div className="profil-container">
                <div className="profil-left">
                    <h2>Informations personnelles</h2>
                    <div className="input-group">
                        <Input name="lastname" label="Nom" value={formData.lastname} onChange={handleUserChange} />
                        <Input name="firstname" label="Prénom" value={formData.firstname} onChange={handleUserChange} />
                    </div>
                    <div className="input-group">
                        <Input name="birthDate" label="Date de naissance" value={formData.birthDate} onChange={handleUserChange} />
                        <Select
                            label="Genre"
                            name="gender"
                            value={formData.gender}
                            onChange={handleUserChange}
                            placeholder="Genre"
                            options={[
                                { value: "homme", label: "Homme" },
                                { value: "femme", label: "Femme" },
                                { value: "autre", label: "Autre" },
                            ]}
                        />
                    </div>
                    <div className="input-group">
                        <Button onClick={handleUserSubmit} text="Enregistrer" />
                        <Button onClick={handleLogout} text="Déconnexion" />
                    </div>
                                
                    {me.accountType === "partenaire" && (
                        <>
                            <hr />

                            <h2>Publicités</h2>
                            <p>
                                Choisissez une image et un lien. Cette image s’affichera sur la plateforme pour les acheteurs (de façon aléatoire). En cliquant sur l’image, on sera redirigé vers le lien que vous avez renseigné.
                            </p>
                            <Input
                                name="link"
                                placeholder="Lien"
                                value={pubData.link}
                                onChange={(e) => setPubData({ ...pubData, link: e.target.value })}
                            />
                            <br />
                            <FileButton
                                buttonText="Image publicitaire"
                                name="image"
                                value={pubData.image}
                                onChange={(e) => setNewImage(e.target.files[0])}
                            />
                            <Button text="Enregistrer la publicité" onClick={handlePubSubmit} />

                            {pubData.image && (
                                <div className="imagePub">
                                    <p>Image actuelle :</p>
                                    <img
                                        src={`http://localhost:5000/uploadsPub/${pubData.image?.replace(/^pub[\\/]/, "")}`}
                                        alt="Publicité actuelle"
                                        style={{ maxWidth: "300px", marginTop: "10px", borderRadius: "8px" }}
                                    />
                                </div>
                            )}
                        </>
                    )}
                    
                </div>

                <div className="profil-right">
                    <h2>Abonnements</h2>
                    <div className="subscription-cards">
                        <SubscriptionCard
                            type="PREMIUM"
                            price={5}
                            color="#d4c100"
                            features={[
                                "Fonctionnalité 1",
                                "Fonctionnalité 2",
                                "Fonctionnalité 3",
                                "Fonctionnalité 4",
                                "Fonctionnalité 5",
                                "Fonctionnalité 6",
                            ]}
                        />
                        <SubscriptionCard
                            type="PRO"
                            price={10}
                            color="#d60000"
                            features={[
                                "Fonctionnalité 1",
                                "Fonctionnalité 2",
                                "Fonctionnalité 3",
                                "Fonctionnalité 4",
                                "Fonctionnalité 5",
                                "Fonctionnalité 6",
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profil;
