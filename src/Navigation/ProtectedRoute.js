import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const PrivateRoute = ({ children, requiredRole }) => {
    const item = JSON.parse(secureLocalStorage.getItem("logInfo"));
    const token = item?.token;
    const role = item?.role;

    // If the user is not authenticated (no token), redirect to /signin
    if (!item || !token) {
        return <Navigate to="/signin" />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;
