import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import React from "react";
import "../styles/Home.css";


const Home = () => {

    return (
        <div>
          {/* Header */}
          <header className="header">
            <h1>Mon Dossier Locataire</h1>
            <p>Construisez votre dossier en toute sécurité et de manière simplifiée</p>
          </header>
    
          {/* Image en background */}
          <div className="hero-image"></div>
    
          {/* Section Dossier */}
          <section className="dossier-section">
            <h2>Complétez votre dossier :</h2>
            
            <div className="dossier-box">
              <div className="dossier-icon"></div>
              <div className="dossier-text">
                <h3>Je télécharge mes pièces</h3>
                <p>Ajoutez vos documents pour compléter votre dossier.</p>
              </div>
            </div>
    
            <div className="dossier-box">
              <div className="dossier-icon"></div>
              <div className="dossier-text">
                <h3>Mes aides sont dans mon dossier</h3>
                <p>Regroupez vos justificatifs en un seul endroit.</p>
              </div>
            </div>
    
            <div className="dossier-box">
              <div className="dossier-icon"></div>
              <div className="dossier-text">
                <h3>Mon dossier est prêt à être envoyé</h3>
                <p>Envoyez facilement votre dossier aux propriétaires.</p>
              </div>
            </div>
          </section>
    
          {/* Section Partenaires */}
          <section className="partners">
            <h2>Nos Partenaires</h2>
            <img src="/images/crous-logo.png" alt="Crous" />
            <img src="/images/jinka-logo.png" alt="Jinka" />
            <img src="/images/leboncoin-logo.png" alt="Leboncoin" />
          </section>
    
          {/* Footer */}
          <footer className="footer">
            <p>© 2025 Mon Dossier Locataire. Tous droits réservés.</p>
          </footer>
        </div>
      );
    };

export default Home;
