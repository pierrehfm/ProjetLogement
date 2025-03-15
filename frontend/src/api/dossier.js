import API_URL from "./config";

export const getDossier = async (token) => {
    const response = await fetch(`${API_URL}/dossier`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};

export const updateDossier = async (token, formData) => {
    const response = await fetch(`${API_URL}/dossier`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }, // Pas de Content-Type ici !
        body: formData
    });
    return response.json();
};
