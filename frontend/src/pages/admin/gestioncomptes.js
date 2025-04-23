import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import "../../styles/Dashboard.css";
import { getAllUsers } from "../../api/user";
import Button from "../../components/Button";
import Input from "../../components/Input";

const GestionComptes = () => {
    const { token } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers(token);
                setUsers(response);
                setFilteredUsers(response);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs :", error);
            }
        };

        fetchUsers();
    }, [token]);

    useEffect(() => {
        const results = users.filter((user) => {
            const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
            const email = user.email.toLowerCase();
            const query = search.toLowerCase();
            return fullName.includes(query) || email.includes(query);
        });
        setFilteredUsers(results);
    }, [search, users]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    return (
        <div>
            <Navbar />
            <div className="dossiers-container">
                <h1>Liste des Utilisateurs</h1>
                <div className="filter-container">
                    <div className="search-bar">
                        <Input
                            type="text"
                            placeholder="Rechercher..."
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Date de création</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.firstname} {user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.createdAt}</td>
                                    <td>
                                        <Button 
                                            text="Suspendre" 
                                            style={{ padding: "5px", backgroundColor: "#ffc906"}}
                                        />
                                        <Button 
                                            text="Supprimer" 
                                            style={{ padding: "5px", backgroundColor: "#fb3636"}}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Aucun utilisateur trouvé.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default GestionComptes;
