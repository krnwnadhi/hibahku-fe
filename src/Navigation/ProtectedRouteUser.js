import { Navigate, Outlet } from "react-router-dom";

import secureLocalStorage from "react-secure-storage";

const ProtectedRouteUser = ({ children, ...rest }) => {
    const item = JSON.parse(secureLocalStorage.getItem("logInfo"));
    const role = item?.role;

    return role ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRouteUser;
