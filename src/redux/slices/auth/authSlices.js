import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { baseAuthURL } from "../../../utils/baseURL";
import secureLocalStorage from "react-secure-storage";

const resetRegisterAction = createAction("auth/register/reset");
const resetLoginAction = createAction("auth/login/reset");
const resetLogoutAction = createAction("auth/logout/reset");

//register user
export const registerUserAction = createAsyncThunk(
    "auth/register",
    async (user, { rejectWithValue, getState, dispatch }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            };

            await new Promise((resolve) => setTimeout(resolve, 2000));

            const { data } = await axios.post(
                `${baseAuthURL}/register`,
                user,
                config
            );

            dispatch(resetRegisterAction());

            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//login user
export const loginUserAction = createAsyncThunk(
    "auth/login",
    async (userData, { rejectWithValue, getState, dispatch }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            };

            await new Promise((resolve) => setTimeout(resolve, 2000));

            const { data } = await axios.post(
                `${baseAuthURL}/login`,
                userData,
                config
            );

            secureLocalStorage.setItem("logInfo", JSON.stringify(data));

            dispatch(resetLoginAction());

            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//get user from local storage and place it into the store
const userLoginFormStorage = secureLocalStorage.getItem("logInfo")
    ? JSON.parse(secureLocalStorage.getItem("logInfo"))
    : null;

export const logoutUserAction = createAsyncThunk(
    "auth/logout",
    async (userData, { rejectWithValue, getState, dispatch }) => {
        try {
            secureLocalStorage.removeItem("logInfo");

            // await new Promise((resolve) => setTimeout(resolve, 2000));

            dispatch(resetLogoutAction());
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//Slices
const authSlices = createSlice({
    name: "auth",
    initialState: {
        userAuth: userLoginFormStorage,
    },
    extraReducers: (builder) => {
        //register user
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.appError = undefined;
            state.serverError = undefined;
        });

        //reset state
        builder.addCase(resetRegisterAction, (state, action) => {
            state.isRegistered = true;
        });

        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.registered = action?.payload;
            state.isRegistered = false;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //login user
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
            state.appError = undefined;
            state.serverError = undefined;
        });

        //reset state
        builder.addCase(resetLoginAction, (state, action) => {
            state.isLogin = true;
        });

        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.isLogin = false;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //logout user
        builder.addCase(logoutUserAction.pending, (state, action) => {
            state.loading = true;
            state.appError = undefined;
            state.serverError = undefined;
        });

        //reset state
        builder.addCase(resetLogoutAction, (state, action) => {
            state.isLogout = true;
        });

        builder.addCase(logoutUserAction.fulfilled, (state, action) => {
            state.userAuth = undefined;
            state.isLogout = false;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(logoutUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });
    },
});

export default authSlices.reducer;
