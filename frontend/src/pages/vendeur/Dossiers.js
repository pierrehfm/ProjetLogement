import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/Dossiers.css";
import { getAllDossiers } from "../../api/dossier";
import Button from "../../components/Button";
import Input from "../../components/Input";

const Dossiers = () => {
    const { token } = useContext(AuthContext);
    const [dossiers, setDossiers] = useState([]);
    const [filteredDossiers, setFilteredDossiers] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({
        name: "",
        salaryMin: "",
        budgetMin: "",
        location: "",
        scoreMin: ""
    });
    const [filterVisible, setFilterVisible] = useState(false);

    useEffect(() => {
        const fetchDossiers = async () => {
            try {
                const response = await getAllDossiers(token);
                setDossiers(response);
                setFilteredDossiers(response);
            } catch (error) {
                console.error("Erreur lors de la récupération des dossiers :", error);
            }
        };

        fetchDossiers();
    }, [token]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter({
            ...filter,
            [event.target.name]: event.target.value
        });
    };

    const filterDossiers = () => {
        let filtered = dossiers;
        if (filter.name) {
            filtered = filtered.filter(dossier =>
                `${dossier.User.firstname} ${dossier.User.lastname}`
                    .toLowerCase()
                    .includes(filter.name.toLowerCase())
            );
        }

        if (filter.salaryMin) {
            filtered = filtered.filter(dossier => dossier.researchSalary >= parseFloat(filter.salaryMin));
        }

        if (filter.budgetMin) {
            filtered = filtered.filter(dossier => dossier.researchBudget >= parseFloat(filter.budgetMin));
        }

        if (filter.location) {
            filtered = filtered.filter(dossier => dossier.researchLocation.toLowerCase().includes(filter.location.toLowerCase()));
        }

        if (filter.scoreMin) {
            filtered = filtered.filter(dossier => dossier.dossierScore >= parseFloat(filter.scoreMin));
        }

        setFilteredDossiers(filtered);
    };

    useEffect(() => {
        filterDossiers();
    }, [filter]);

    return (
        <div>
            
            <div className="dossiers-container">
                <h1>Liste des Dossiers</h1>

                {/* Conteneur pour le bouton et la barre de recherche */}
                <div className="filter-container">
                    {/* Bouton pour afficher les filtres */}
                    <Button
                        text={filterVisible ? "Masquer les filtres" : "Afficher les filtres"}
                        style={{ marginBottom: "20px", width: "200px" }}
                        onClick={() => setFilterVisible(!filterVisible)}
                    />

                    {/* Barre de recherche à droite */}
                    <div className="search-bar">
                        <Input
                            type="text"
                            placeholder="Rechercher..."
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                {/* Div avec les filtres */}
                {filterVisible && (
                    <div className="filters">
                        <Input
                            type="text"
                            name="name"
                            placeholder="Nom"
                            value={filter.name}
                            onChange={handleFilterChange}
                        />
                        <Input
                            type="number"
                            name="salaryMin"
                            placeholder="Salaire min"
                            value={filter.salaryMin}
                            onChange={handleFilterChange}
                        />
                        <Input
                            type="number"
                            name="budgetMin"
                            placeholder="Budget min"
                            value={filter.budgetMin}
                            onChange={handleFilterChange}
                        />
                        <Input
                            type="text"
                            name="location"
                            placeholder="Lieu"
                            value={filter.location}
                            onChange={handleFilterChange}
                        />
                        <Input
                            type="number"
                            name="scoreMin"
                            placeholder="Score min"
                            value={filter.scoreMin}
                            onChange={handleFilterChange}
                        />
                    </div>
                )}

                {/* Tableau des dossiers */}
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Revenus</th>
                            <th>Budget</th>
                            <th>Lieu</th>
                            <th>Score</th>
                            <th>Voir le profil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDossiers.length > 0 ? (
                            filteredDossiers.map((dossier) => (
                                <tr key={dossier.id}>
                                    <td>{dossier.User.firstname} {dossier.User.lastname}</td>
                                    <td>{dossier.researchSalary}</td>
                                    <td>{dossier.researchBudget}</td>
                                    <td>{dossier.researchLocation}</td>
                                    <td>{dossier.dossierScore || "Non défini"}</td>
                                    <td>
                                        <Button 
                                            text="Voir" 
                                            style={{ padding: "5px" }} 
                                            onClick={() => window.open(`${process.env.REACT_APP_URL_FRONTEND}/dossier/${dossier.userId}`, "_blank")}
                                            />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Aucun dossier trouvé.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dossiers;
