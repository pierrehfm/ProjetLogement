import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import FileButton from "../../components/FileButton";
import Select from "../../components/Select";
import "../../styles/Dossier.css";
import { getDossier, updateDossier } from "../../api/dossier";

const Dossier = () => {
    const { token } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        id: "",
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
        photo: null,
        proofOfIncome: null,
        paySlip: null,
        incomeSelfEmployment: null,
        employerCertificate: null,
        aidOrAllowance: null,
        pensionRetirement: null,
        identityProof: null,
        adressProof: null,
        bankingDocuments: null,
        taxNotice: null,
        diplomasOrCertificates: null
    });

    useEffect(() => {
        const fetchDossier = async () => {
            const data = await getDossier(token);
            if (data) {
                setFormData({
                    id: data.id || "",
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
                    photo: data.photo || null,
                    proofOfIncome: data.proofOfIncome || null,
                    paySlip: data.paySlip || null,
                    incomeSelfEmployment: data.incomeSelfEmployment || null,
                    employerCertificate: data.employerCertificate || null,
                    aidOrAllowance: data.aidOrAllowance || null,
                    pensionRetirement: data.pensionRetirement || null,
                    identityProof: data.identityProof || null,
                    adressProof: data.adressProof || null,
                    bankingDocuments: data.bankingDocuments || null,
                    taxNotice: data.taxNotice || null,
                    diplomasOrCertificates: data.diplomasOrCertificates || null
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
        if (formData.photo) form.append("photo", formData.photo);
        if (formData.proofOfIncome) form.append("proofOfIncome", formData.proofOfIncome);
        if (formData.paySlip) form.append("paySlip", formData.paySlip);
        if (formData.incomeSelfEmployment) form.append("incomeSelfEmployment", formData.incomeSelfEmployment);
        if (formData.employerCertificate) form.append("employerCertificate", formData.employerCertificate);
        if (formData.aidOrAllowance) form.append("aidOrAllowance", formData.aidOrAllowance);
        if (formData.pensionRetirement) form.append("pensionRetirement", formData.pensionRetirement);
        if (formData.identityProof) form.append("identityProof", formData.identityProof);
        if (formData.adressProof) form.append("adressProof", formData.adressProof);
        if (formData.bankingDocuments) form.append("bankingDocuments", formData.bankingDocuments);
        if (formData.taxNotice) form.append("taxNotice", formData.taxNotice);
        if (formData.diplomasOrCertificates) form.append("diplomasOrCertificates", formData.diplomasOrCertificates);

        const result = await updateDossier(token, form);
        alert(result.message);
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
                        <FileButton buttonText="Photo d'identité" name="photo" value={formData.photo} onChange={handleFileChange} />
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
                        <FileButton buttonText="Justificatif de revenus" name="proofOfIncome" value={formData.proofOfIncome} onChange={handleFileChange} />
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

                <div className="vertical-line"></div>
                        
                <div className="dossier-right">

                    <h2>Mes documents</h2>
                    <br></br>
                        
                    <div className="input-group">
                        <FileButton buttonText="Bulletin de salaire" name="paySlip" value={formData.paySlip} onChange={handleFileChange} />
                        <FileButton buttonText="Revenus d’activité indépendante" name="incomeSelfEmployment" value={formData.incomeSelfEmployment} onChange={handleFileChange} />
                    </div>
                    <div className="input-group">
                        <FileButton buttonText="Attestation d’employeur" name="employerCertificate" value={formData.employerCertificate} onChange={handleFileChange} />
                        <FileButton buttonText="Aide ou allocation" name="aidOrAllowance" value={formData.aidOrAllowance} onChange={handleFileChange} />
                    </div>
                    <div className="input-group">
                        <FileButton buttonText="Pension / retraite" name="pensionRetirement" value={formData.pensionRetirement} onChange={handleFileChange} />
                        <FileButton buttonText="Justificatifs d’identité" name="identityProof" value={formData.identityProof} onChange={handleFileChange} />
                    </div>
                    <div className="input-group">
                        <FileButton buttonText="Justificatifs de domicile" name="adressProof" value={formData.adressProof} onChange={handleFileChange} />
                        <FileButton buttonText="Justificatifs bancaires" name="bankingDocuments" value={formData.bankingDocuments} onChange={handleFileChange} />
                    </div>
                    <div className="input-group">
                        <FileButton buttonText="Avis d’imposition" name="taxNotice" value={formData.taxNotice} onChange={handleFileChange} />
                        <FileButton buttonText="Diplômes ou certificats" name="diplomasOrCertificates" value={formData.diplomasOrCertificates} onChange={handleFileChange} />
                    </div>

                    <Button onClick={handleSubmit} text="Enregistrer" />
                    <p>Lien de partage de votre dosier : {process.env.REACT_APP_URL_FRONTEND}/dossier/{formData.id}</p>
                </div>
            </div>
        </div>
    );
};

export default Dossier;