import { useEffect, useState, useContext } from "react";
import { getAllPub } from "../api/pub";
import { AuthContext } from "../context/AuthContext";

const Pub = () => {
    const [pub, setPub] = useState(null);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchRandomPub = async () => {
            try {
                const pubs = await getAllPub(token);
                if (pubs.length > 0) {
                    const randomIndex = Math.floor(Math.random() * pubs.length);
                    setPub(pubs[randomIndex]);
                }
            } catch (err) {
                console.error("Erreur lors de la récupération des publicités :", err);
            }
        };

        fetchRandomPub();
    }, []);

    if (!pub) return null;

    const imageSrc = `http://${process.env.REACT_APP_URL_BACKEND}/uploadsPub/${pub.image.replace(/^pub[\\/]/, "")}`;

    return (
        <div className="random-pub">
            <a href={pub.link} target="_blank" rel="noopener noreferrer">
                <img src={imageSrc} alt="Publicité"/>
            </a>
        </div>
    );
};

export default Pub;
