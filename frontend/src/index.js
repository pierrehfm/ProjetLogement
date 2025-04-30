import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css"; 
import './styles/colors.css';
import MesDemarches from "./pages/global/MesDemarches";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

<Route path="/mes-demarches" element={<PrivateRoute element={<MesDemarches />} />} />