import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {

    const { user, loading } = useAuth();

    // SHOW LOADING WHILE CHECKING AUTH

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // IF USER NOT LOGGED IN

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // IF USER LOGGED IN

    return children;
};

export default ProtectedRoute;