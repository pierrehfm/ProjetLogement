import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/global/Dashboard";
import Dossier from "./pages/acheteur/Dossier";
import Dossiers from "./pages/vendeur/Dossiers";
import DossierView from "./pages/DossierView";
import Calendar from "./pages/global/Calendar";
import Profil from "./pages/global/Profil";
import GestionComptes from "./pages/admin/gestioncomptes";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dossier/:id" element={<DossierView />} />
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                    <Route path="/dossier" element={<PrivateRoute element={<Dossier />} />} />
                    <Route path="/dossiers" element={<PrivateRoute element={<Dossiers />} />} />
                    <Route path="/profil" element={<PrivateRoute element={<Profil />} />} />
                    <Route path="/calendrier" element={<PrivateRoute element={<Calendar />} />} />
                    <Route path="/gestioncomptes" element={<GestionComptes />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;