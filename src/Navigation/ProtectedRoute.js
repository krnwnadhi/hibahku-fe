import { Navigate, Outlet } from "react-router-dom";

import secureLocalStorage from "react-secure-storage";

const ProtectedRoute = ({ children, ...rest }) => {
    const item = JSON.parse(secureLocalStorage.getItem("logInfo"));
    const token = item?.token;

    return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
