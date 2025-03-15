import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import FileButton from "../components/FileButton";
import Select from "../components/Select";
import "../styles/Dossier.css";
import { getDossier, updateDossier } from "../api/dossier";

const Dossier = () => {
    const { token } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        currentAdress: "",
        familySituation: "",
        birthPlace: "",
        phone: "",
        guarantorLastname: "",
        guarantorFirstname: "",
        guarantorEmail: "",
        guarantorPhone: "",
        researchLocation: "",
        researchType: "",
        researchSalary: "",
        researchBudget: "",
        file1: null,
        file2: null
    });

    useEffect(() => {
        const fetchDossier = async () => {
            const data = await getDossier(token);
            if (data) {
                setFormData({
                    // field1: data.field1 || "",
                    // field2: data.field2 || "",
                    currentAdress: data.currentAdress || "",
                    familySituation: data.familySituation || "",
                    birthPlace: data.birthPlace || "",
                    phone: data.phone || "",
                    guarantorLastname: data.guarantorLastname || "",
                    guarantorFirstname: data.guarantorFirstname || "",
                    guarantorEmail: data.guarantorEmail || "",
                    guarantorPhone: data.guarantorPhone || "",
                    researchLocation: data.researchLocation || "",
                    researchType: data.researchType || "",
                    researchSalary: data.researchSalary || "",
                    researchBudget: data.researchBudget || "",
                    file1: data.file1 || null,
                    file2: data.file2 || null
                });
            }
        };
        fetchDossier();
    }, [token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async () => {
        const form = new FormData();
        form.append("currentAdress", formData.currentAdress);
        form.append("familySituation", formData.familySituation);
        form.append("birthPlace", formData.birthPlace);
        form.append("phone", formData.phone);
        form.append("guarantorLastname", formData.guarantorLastname);
        form.append("guarantorFirstname", formData.guarantorFirstname);
        form.append("guarantorEmail", formData.guarantorEmail);
        form.append("guarantorPhone", formData.guarantorPhone);
        form.append("researchLocation", formData.researchLocation);
        form.append("researchType", formData.researchType);
        form.append("researchSalary", formData.researchSalary);
        form.append("researchBudget", formData.researchBudget);
        if (formData.file1) form.append("file1", formData.file1);
        if (formData.file2) form.append("file2", formData.file2);

        const result = await updateDossier(token, form);
        alert(result.message);
    };

    const getFileName = (filePath) => {
        if (filePath && filePath instanceof File) {
            return filePath.name;
        } else if (filePath) {
            return filePath.split("\\").pop();
        }
        return "";
    };

    return (
        <div>
            <Navbar />
            <div className="dossier-container">
                <div className="dossier-left">
                    <h2>Mon Dossier</h2>
                    <div className="input-group">
                        <Input placeholder="Adresse actuelle" name="currentAdress" value={formData.currentAdress} onChange={handleChange} />
                        <Select
                            placeholder="Situation familliale" 
                            name="familySituation"
                            value={formData.familySituation}
                            onChange={handleChange}
                            options={[
                                { value: "marié", label: "Marié" },
                                { value: "célibataire", label: "Célibataire" },
                                { value: "autre", label: "Autre" }
                            ]}
                        />
                    </div>
                    <div className="input-group">
                        <Input placeholder="Lieu de naissance" name="birthPlace" value={formData.birthPlace} onChange={handleChange} />
                        <Input placeholder="Téléphone" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <FileButton buttonText="Photo d'identité" name="photo" onChange={handleFileChange} />
                    </div>
                    <h2>Votre garant</h2>
                    <div className="input-group">
                        <Input placeholder="Nom" name="guarantorLastname" value={formData.guarantorLastname} onChange={handleChange} />
                        <Input placeholder="Prénom" name="guarantorFirstname" value={formData.guarantorFirstname} onChange={handleChange} />
                        
                    </div>
                    <div className="input-group">
                        <Input placeholder="Email" name="guarantorEmail" value={formData.guarantorEmail} onChange={handleChange} />
                        <Input placeholder="Téléphone" name="guarantorPhone" value={formData.guarantorPhone} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <FileButton buttonText="Justificatif de revenus" name="proofOfIncome" onChange={handleFileChange} />
                    </div>
                    
                    <h2>Votre recherche</h2>
                    <div className="input-group">
                        <Input placeholder="Lieu" name="researchLocation" value={formData.researchLocation} onChange={handleChange} />
                        <Select
                            placeholder="Type de logement" 
                            name="researchType"
                            value={formData.researchType}
                            onChange={handleChange}
                            options={[
                                { value: "maison", label: "Maison" },
                                { value: "appartement", label: "Appartement" },
                                { value: "autre", label: "Autre" }
                            ]}
                        />
                    </div>
                    <div className="input-group">
                        <Input placeholder="Salaire" name="researchSalary" value={formData.researchSalary} onChange={handleChange} />
                        <Input placeholder="Budget" name="researchBudget" value={formData.researchBudget} onChange={handleChange} />
                    </div>
                    <br></br>
                </div>

                <div class="vertical-line"></div>
                        
                <div className="dossier-right">

                    <h2>Mes documents</h2>

                    <FileButton buttonText="Bulletin de salaire" name="proofOfIncome" onChange={handleFileChange} />
                    <FileButton buttonText="Revenus d’activité indépendante" name="proofOfIncome" onChange={handleFileChange} />
                    
                    <FileButton buttonText="Attestation d’employeur" name="proofOfIncome" onChange={handleFileChange} />
                    <FileButton buttonText="Aide ou allocation" name="proofOfIncome" onChange={handleFileChange} />

                    <FileButton buttonText="Pension / retraite" name="proofOfIncome" onChange={handleFileChange} />
                    <FileButton buttonText="Justificatifs d’identité" name="proofOfIncome" onChange={handleFileChange} />

                    <FileButton buttonText="Justificatifs de domicile" name="proofOfIncome" onChange={handleFileChange} />
                    <FileButton buttonText="Justificatifs bancaires" name="proofOfIncome" onChange={handleFileChange} />

                    <FileButton buttonText="Avis d’imposition" name="proofOfIncome" onChange={handleFileChange} />
                    <FileButton buttonText="Diplômes ou certificats" name="proofOfIncome" onChange={handleFileChange} />

                    <input type="file" name="file1" onChange={handleFileChange} />
                    {formData.file1 && <p>Fichier actuel : {getFileName(formData.file1)}</p>}

                    <input type="file" name="file2" onChange={handleFileChange} />
                    {formData.file2 && <p>Fichier actuel : {getFileName(formData.file2)}</p>}

                    <Button onClick={handleSubmit} text="Enregistrer" />
                </div>
            </div>
        </div>
    );
};

export default Dossier;