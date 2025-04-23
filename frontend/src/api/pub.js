import API_URL from "./config";

export const getPub = async (token) => {
    // const url = userId ? `${API_URL}/dossier/${userId}` : `${API_URL}/dossier`;

    const response = await fetch(`${API_URL}/pub`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};

export const updatePub = async (token, formData) => {
    const response = await fetch(`${API_URL}/pub`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
    });
    return response.json();
};

export const getAllPub = async (token) => {
    const response = await fetch(`${API_URL}/allpub`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};