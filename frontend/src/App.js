import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Dossier from "./pages/Dossier";
import Profil from "./pages/Profil";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                    <Route path="/dossier" element={<PrivateRoute element={<Dossier />} />} />
                    <Route path="/profil" element={<PrivateRoute element={<Profil />} />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
