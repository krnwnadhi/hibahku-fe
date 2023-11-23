import { Navigate, Outlet } from "react-router-dom";

import secureLocalStorage from "react-secure-storage";

const Anonymous = () => {
    const item = JSON.parse(secureLocalStorage.getItem("logInfo"));
    const token = item?.token;

    return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default Anonymous;
