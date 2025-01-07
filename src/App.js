import "react-toastify/dist/ReactToastify.css";

import { Navigate, Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

import AdminUser from "./Pages/AdminUser/AdminUser";
import Anonymous from "./Navigation/Anonymous";
import AuthVerify from "./utils/AuthVerify";
import Dashboard from "./Pages/Dashboard/Dashboard";
import IndexRekap from "./Pages/Rekap/IndexRekap";
import Page403 from "./Pages/Error/Error 403/Page403";
import Periode from "./Pages/Periode/Periode";
import Persetujuan from "./Pages/Persetujuan/Persetujuan";
import PersetujuanApprove from "./Pages/Persetujuan/PersetujuanApprove";
import PersetujuanDetail from "./Pages/Persetujuan/PersetujuanDetail";
import PrivateRoute from "./Navigation/ProtectedRoute";
import ProtectedRoute from "./Navigation/ProtectedRoute";
import Register from "./Pages/Auth/Register/Register";
import RootLayout from "./components/Layout/RootLayout";
import RumahIbadah from "./Pages/Rumah Ibadah/RumahIbadah";
import RumahIbadahCreate from "./Pages/Rumah Ibadah/RumahIbadahCreate";
import SignIn from "./Pages/Auth/SignIn/SignIn";
import Unauthorized from "./Pages/Error/Unauthorized/Unauthorized";
import UserPage from "./Pages/User/Page/UserPage";
import UserPermohonan from "./Pages/User/Page/UserPermohonan";
import UserStatus from "./Pages/User/Page/UserStatus";
import { logoutUserAction } from "./redux/slices/auth/authSlices";
import { useCallback } from "react";
import { useComputedColorScheme } from "@mantine/core";
import { useDispatch } from "react-redux";

function App() {
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logoutUserAction());
    }, [dispatch]);

    return (
        <div>
            <ToastContainer
                position="top-right"
                limit={3}
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme={computedColorScheme}
                transition={Slide}
            />
          

            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<SignIn />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={<RootLayout />}>
                    {/* Regular User Pages */}
                    <Route
                        path="/dashboard/user/beranda"
                        element={<UserPage />}
                    />
                    <Route
                        path="/dashboard/rumah-ibadah/list"
                        element={<RumahIbadah />}
                    />
                    <Route
                        path="/dashboard/rumah-ibadah/user/create"
                        element={<RumahIbadahCreate />}
                    />
                    <Route
                        path="/dashboard/user/dokumen"
                        element={<UserPermohonan />}
                    />
                    <Route
                        path="/dashboard/user/progres/:id"
                        element={<UserStatus />}
                    />

                    {/* Protected Admin Routes (only for admin role 1) */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute requiredRole={1}>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/admin/persetujuan"
                        element={
                            <PrivateRoute requiredRole={1}>
                                <Persetujuan />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/admin/persetujuan/:id"
                        element={
                            <PrivateRoute requiredRole={1}>
                                <PersetujuanApprove />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/admin/persetujuan/detail/:id"
                        element={
                            <PrivateRoute requiredRole={1}>
                                <PersetujuanDetail />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/admin/list"
                        element={
                            <PrivateRoute requiredRole={1}>
                                <AdminUser />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/admin/periode"
                        element={
                            <PrivateRoute requiredRole={1}>
                                <Periode />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/admin/rekap/:tabValue"
                        element={
                            <PrivateRoute requiredRole={1}>
                                <IndexRekap />
                            </PrivateRoute>
                        }
                    />
                </Route>

                {/* Catch-all route for 404 */}
                <Route path="*" element={<Navigate to="/404" />} />
                <Route path="/404" element={<Page403 />} />

                <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>

            <AuthVerify logOut={logOut} />
        </div>
    );
}

export default App;
