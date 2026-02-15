import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { baseUserURL } from "../../../utils/baseURL";

//get All User
export const getAllUsersAction = createAsyncThunk(
    "user/getAll",
    async (data, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.auth?.userAuth;

        const config = {
            headers: {
                Authorization: `Bearer ${user?.token}`,
                "Access-Control-Allow-Origin": "*",
            },
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
            const { data } = await axios.get(`${baseUserURL}/getusers`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    },
);

//get single User
export const getSingleUsersAction = createAsyncThunk(
    "user/getSingle",
    async (id, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.auth?.userAuth;

        const config = {
            headers: {
                Authorization: `Bearer ${user?.token}`,
                "Access-Control-Allow-Origin": "*",
            },
        };

        await new Promise((resolve) => setTimeout(resolve, 2000));

        try {
            const { data } = await axios.get(
                `${baseUserURL}/getusers/${id}`,
                config,
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    },
);

//Hapus user
export const deleteUserAction = createAsyncThunk(
    "user/delete",
    async (id, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.auth?.userAuth;

        const config = {
            headers: {
                Authorization: `Bearer ${user?.token}`,
                "Access-Control-Allow-Origin": "*",
            },
        };

        await new Promise((resolve) => setTimeout(resolve, 2000));

        try {
            const { data } = await axios.delete(
                `${baseUserURL}/getusers/${id}`,
                config,
            );

            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    },
);

// const userSlices = createSlice({
//     name: {},
//     initialState: {},
//     extraReducers: (builder) => {
//         //fetch all user
//         builder.addCase(getAllUsersAction.pending, (state, action) => {
//             state.loading = true;
//         });
//         builder.addCase(getAllUsersAction.fulfilled, (state, action) => {
//             state.usersList = action?.payload;
//             state.loading = false;
//             state.appError = undefined;
//             state.serverError = undefined;
//         });
//         builder.addCase(getAllUsersAction.rejected, (state, action) => {
//             state.loading = false;
//             state.appError = action?.payload?.message;
//             state.serverError = action?.error?.message;
//         });

//         //fetch single user
//         builder.addCase(getSingleUsersAction.pending, (state, action) => {
//             state.loading = true;
//         });
//         builder.addCase(getSingleUsersAction.fulfilled, (state, action) => {
//             state.userDetail = action?.payload;
//             state.loading = false;
//             state.appError = undefined;
//             state.serverError = undefined;
//         });
//         builder.addCase(getSingleUsersAction.rejected, (state, action) => {
//             state.loading = false;
//             state.appError = action?.payload?.message;
//             state.serverError = action?.error?.message;
//         });

//         //delete file
//         builder.addCase(deleteUserAction.pending, (state, action) => {
//             state.loading = true;
//         });

//         builder.addCase(deleteUserAction.fulfilled, (state, action) => {
//             state.userId = action?.payload;
//             state.loading = false;
//             state.appError = undefined;
//             state.serverError = undefined;
//         });
//         builder.addCase(deleteUserAction.rejected, (state, action) => {
//             state.loading = false;
//             state.appError = action?.payload?.message;
//             state.serverError = action?.error?.message;
//         });
//     },
// });

const userSlices = createSlice({
    name: "users", // Berikan nama slice
    initialState: {
        usersList: [], // Inisialisasi sebagai array kosong agar map() tidak error
        userDetail: null,
        loading: false,
        appError: undefined,
        serverError: undefined,
    },
    extraReducers: (builder) => {
        // --- Fetch All Users ---
        builder.addCase(getAllUsersAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllUsersAction.fulfilled, (state, action) => {
            state.loading = false;
            // PENTING: Jika API mengembalikan { result: [...] },
            // maka gunakan action.payload.result
            state.usersList = action.payload?.result || action.payload;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(getAllUsersAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        // --- Fetch Single User ---
        builder.addCase(getSingleUsersAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getSingleUsersAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userDetail = action.payload;
            state.appError = undefined;
        });

        // --- Delete User ---
        builder.addCase(deleteUserAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = true; // Flag pembantu jika diperlukan
            state.appError = undefined;
        });
        builder.addCase(deleteUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
        });
    },
});

export default userSlices.reducer;
