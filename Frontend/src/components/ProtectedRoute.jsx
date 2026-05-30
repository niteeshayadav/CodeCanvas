import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {

    const { user, loading } = useAuth();

    // Show loading while checking Auth

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // If user not logged in

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If user logged in

    return children;
};

export default ProtectedRoute;