import { Navigate, Outlet } from "react-router-dom";

import secureLocalStorage from "react-secure-storage";
import { useSelector } from "react-redux";

const Anonymous = () => {
    const user = useSelector((state) => state?.userAuth);
    console.log(user);

    return user ? <Navigate to="/signin" replace /> : <Outlet />;

    // const item = JSON.parse(secureLocalStorage.getItem("logInfo"));
    // const token = item?.token;

    // return item ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default Anonymous;
