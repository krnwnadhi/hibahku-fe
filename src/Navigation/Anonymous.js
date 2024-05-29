import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

const Anonymous = () => {
    const user = useSelector((state) => state?.userAuth);

    return user ? <Navigate to="/signin" replace /> : <Outlet />;
};

export default Anonymous;
