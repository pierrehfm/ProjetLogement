import API_URL from "./config";

export const getDossier = async (token, userId = null) => {
    const url = userId ? `${API_URL}/dossier/${userId}` : `${API_URL}/dossier`;

    const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};

export const updateDossier = async (token, formData) => {
    const response = await fetch(`${API_URL}/dossier`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
    });
    return response.json();
};

export const getAllDossiers = async (token) => {
    const response = await fetch(`${API_URL}/alldossiers`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};

export const getPublicDossier = async (userId) => {
    const url = `${API_URL}/dossier/${userId}`;

    const response = await fetch(url, {
        method: "GET",
    });
    return response.json();
};