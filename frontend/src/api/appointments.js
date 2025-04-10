import API_URL from "./config";

export const getAppointments = async (token, userId = null) => {
    const response = await fetch(`${API_URL}/appointments`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};

export const createAppointment = async (token, formData) => {
    const response = await fetch(`${API_URL}/appointment`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
    });
    return response.json();
};
