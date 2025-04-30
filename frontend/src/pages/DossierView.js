import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import "../styles/DossierView.css";
import { getPublicDossier } from "../api/dossier";

const Dossier = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchDossier = async () => {
            const data = await getPublicDossier(id);
            if (data) {
                setFormData(data);
            }
        };
        fetchDossier();
    }, [id]);

    if (!formData) return <p>Chargement...</p>;

    const fileUrl = (fileName) => 
        typeof fileName === "string" ? 
        `${process.env.REACT_APP_URL_BACKEND}/uploads/${fileName.replace(/usersDossiers\\/, '').replace(/\\/g, '/')}` : null;
    

    return (
        <div className="dossier-view-container">
            <h2 className="dossier-title">Dossier</h2>
            <div className="section">
                <h3>Informations personnelles</h3>
                <p><strong>Adresse actuelle :</strong> {formData.currentAdress}</p>
                <p><strong>Situation familiale :</strong> {formData.familySituation}</p>
                <p><strong>Lieu de naissance :</strong> {formData.birthPlace}</p>
                <p><strong>Téléphone :</strong> {formData.phone}</p>
            </div>

            <div className="section">
                <h3>Garant</h3>
                <p><strong>Nom :</strong> {formData.guarantorLastname}</p>
                <p><strong>Prénom :</strong> {formData.guarantorFirstname}</p>
                <p><strong>Email :</strong> {formData.guarantorEmail}</p>
                <p><strong>Téléphone :</strong> {formData.guarantorPhone}</p>
            </div>

            <div className="section">
                <h3>Recherche</h3>
                <p><strong>Lieu :</strong> {formData.researchLocation}</p>
                <p><strong>Type :</strong> {formData.researchType}</p>
                <p><strong>Salaire :</strong> {formData.researchSalary}</p>
                <p><strong>Budget :</strong> {formData.researchBudget}</p>
            </div>

            <div className="section">
                <h3>Documents</h3>
                {Object.entries(formData).map(([key, value]) => (
                    key !== 'currentAdress' && key !== 'familySituation' && key !== 'birthPlace' &&
                    key !== 'phone' && key !== 'guarantorLastname' && key !== 'guarantorFirstname' &&
                    key !== 'guarantorEmail' && key !== 'guarantorPhone' && key !== 'researchLocation' &&
                    key !== 'researchType' && key !== 'researchSalary' && key !== 'researchBudget' && key !== 'id'
                    && key !== 'userId' && key !== 'dossierScore' && key !== 'createdAt' && key !== 'updatedAt'
                    && value ? (
                        <p key={key}>
                            <strong>{key} :</strong> <a href={fileUrl(value)} target="_blank" rel="noopener noreferrer">Voir</a>
                        </p>
                    ) : null
                ))}
            </div>
        </div>
    );
};

export default Dossier;