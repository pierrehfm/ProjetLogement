import API_URL from "./config";

export const updateUser = async (token, userData) => {
    const response = await fetch(`${API_URL}/user/update`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    return response.json();
};

export const updateUserType = async (token, userData) => {
    const response = await fetch(`${API_URL}/user/updateusertype`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    return response.json();
};

export const getAllUsers = async (token) => {
    const response = await fetch(`${API_URL}/user/allusers`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
};