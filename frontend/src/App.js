import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/global/Dashboard";
import Dossier from "./pages/acheteur/Dossier";
import Calendar from "./pages/global/Calendar";
import Profil from "./pages/global/Profil";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />  {/* Ajout de cette ligne */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                    <Route path="/dossier" element={<PrivateRoute element={<Dossier />} />} />
                    <Route path="/profil" element={<PrivateRoute element={<Profil />} />} />
                    <Route path="/calendrier" element={<PrivateRoute element={<Calendar />} />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
