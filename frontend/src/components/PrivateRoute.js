import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ element }) => {
    const { me, loading } = useContext(AuthContext);

    if (loading) return <div>Chargement...</div>; 

    return me ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
