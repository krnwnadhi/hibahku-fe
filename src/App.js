import "react-toastify/dist/ReactToastify.css";

import { Navigate, Route, Routes } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminPage from "./Pages/Admin/AdminPage";
import Anonymous from "./Navigation/Anonymous";
import AuthVerify from "./utils/AuthVerify";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardUser from "./Pages/Dashboard/DashboardUser";
import Page403 from "./Pages/Error/Error 403/Page403";
import ProtectedRoute from "./Navigation/ProtectedRoute";
import ProtectedRouteUser from "./Navigation/ProtectedRouteUser";
import Register from "./Pages/Auth/Register/Register";
import RootLayout from "./components/Layout/RootLayout";
import RootLayoutUser from "./components/Layout/RootLayoutUser";
import RumahIbadah from "./Pages/Rumah Ibadah/RumahIbadah";
import RumahIbadahCreate from "./Pages/Rumah Ibadah/RumahIbadahCreate";
import SignIn from "./Pages/Auth/SignIn/SignIn";
import UserPage from "./Pages/User/Page/UserPage";
import UserPermohonan from "./Pages/User/Page/UserPermohonan";
import UserStatus from "./Pages/User/Page/UserStatus";
import { logoutUserAction } from "./redux/slices/auth/authSlices";
import secureLocalStorage from "react-secure-storage";
import { useComputedColorScheme } from "@mantine/core";
import { useNetwork } from "@mantine/hooks";

// import NoPage from "./Pages/Error/NoPage";

function App() {
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const networkStatus = useNetwork();

    // useEffect(() => {
    //     const abortController = new AbortController();

    //     if (networkStatus.online) {
    //         toast("Memeriksa jaringan...", {
    //             isLoading: true,
    //             autoClose: false,
    //         });

    //         // Simulate a loading process
    //         setLoading(true);
    //         setTimeout(() => {
    //             setLoading(false);
    //             toast.dismiss(); // Dismiss the loading toast
    //             toast.success("Online!");
    //         }, 1500);
    //     } else {
    //         toast.error("Offline!");
    //     }

    //     return () => {
    //         abortController.abort();
    //     };
    // }, [networkStatus.online]);

    // const user = useSelector((state) => state?.auth);
    // const { userAuth } = user;
    // const { role } = userAuth;

    // console.log(role);

    const logOut = useCallback(() => {
        dispatch(logoutUserAction());
    }, [dispatch]);

    return (
        <>
            <ToastContainer
                position="top-right"
                limit={3}
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme={computedColorScheme}
                transition={Slide}
            />
            <Routes>
                <Route element={<Anonymous />}>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<RootLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route
                            path="/dashboard/admin"
                            element={<AdminPage />}
                        />
                        <Route
                            path="/dashboard/rumah-ibadah/list"
                            element={<RumahIbadah />}
                        />
                        <Route
                            path="/dashboard/rumah-ibadah/user/create"
                            element={<RumahIbadahCreate />}
                        />

                        {/* <Route element={<RootLayoutUser />}> */}
                        <Route
                            path="/dashboard/user/beranda"
                            element={<UserPage />}
                        />

                        <Route
                            path="/dashboard/user/dokumen"
                            element={<UserPermohonan />}
                        />

                        <Route
                            path="/dashboard/user/status"
                            element={<UserStatus />}
                        />
                        {/* </Route> */}
                    </Route>
                </Route>
                {/* <Route element={<ProtectedRouteUser />}>
                    <Route path="/dashboard/user" element={<RootLayoutUser />}>
                        <Route index element={<DashboardUser />} />

                        <Route
                            path="/dashboard/user-dashboard"
                            element={<UserPage />}
                        />
                    </Route>
                </Route> */}

                <Route path="*" element={<Navigate to="/404" />} />
                <Route path="/404" element={<Page403 />} />
            </Routes>
            <AuthVerify logOut={logOut} />
        </>
    );
}

export default App;
