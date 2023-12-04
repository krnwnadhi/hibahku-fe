import { useLocation, useNavigate } from "react-router-dom";

import secureLocalStorage from "react-secure-storage";
import { useEffect } from "react";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

const AuthVerify = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(secureLocalStorage.getItem("logInfo"));

        if (user) {
            const decodedJwt = parseJwt(user.token);

            if (decodedJwt.exp * 1000 < Date.now()) {
                window.location.reload();
                props.logOut();
                navigate("/signin");
            }
        }
    }, [location, props, navigate]);

    return;
};

export default AuthVerify;
