import "react-toastify/dist/ReactToastify.css";

import { Navigate, Route, Routes } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import AdminPage from "./Pages/Admin/AdminPage";
import Anonymous from "./Navigation/Anonymous";
import Dashboard from "./Pages/Dashboard/Dashboard";
// import NoPage from "./Pages/Error/NoPage";
import Page403 from "./Pages/Error/Error 403/Page403";
import ProtectedRoute from "./Navigation/ProtectedRoute";
import Register from "./Pages/Auth/Register/Register";
import RootLayout from "./components/Layout/RootLayout";
import SignIn from "./Pages/Auth/SignIn/SignIn";
import UserPage from "./Pages/User/UserPage";
import { useComputedColorScheme } from "@mantine/core";
import { useNetwork } from "@mantine/hooks";

function App() {
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const [loading, setLoading] = useState(false);

    const networkStatus = useNetwork();

    useEffect(() => {
        const abortController = new AbortController();

        if (networkStatus.online) {
            toast("Memeriksa jaringan...", {
                isLoading: true,
                autoClose: false,
            });

            // Simulate a loading process
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                toast.dismiss(); // Dismiss the loading toast
                toast.success("Online!");
            }, 1500);
        } else {
            toast.error("Offline!");
        }

        return () => {
            abortController.abort();
        };
    }, [networkStatus.online]);

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
                        <Route path="/dashboard/user" element={<UserPage />} />
                    </Route>
                </Route>
                {/* <Route path="/user" element={<RootLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="admin" element={<AdminPage />} />
                </Route> */}
                <Route path="*" element={<Navigate to="/404" />} />
                <Route path="/404" element={<Page403 />} />
            </Routes>
        </>
    );
}

export default App;
