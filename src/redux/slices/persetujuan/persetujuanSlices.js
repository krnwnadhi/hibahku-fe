import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { basePersetujuanURL } from "../../../utils/baseURL";

// //action to redirect
const resetFileDeleteAction = createAction("persetujuan/delete/reset");

//get all persetujuan Vanilla Fetch
export const getAllPersetujuanAction = createAsyncThunk(
    "persetujuan/getAllPersetujuan",
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
            const response = await fetch(`${basePersetujuanURL}/list`, {
                method: "GET",
                headers: {
                    ...config.headers,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    },
);

//get detail admin persetujuan
export const getDetailAdminPersetujuanAction = createAsyncThunk(
    "persetujuan/getDetailAdminPersetujuan",
    async (id, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.auth?.userAuth;

        const config = {
            headers: {
                Authorization: `Bearer ${user?.token}`,
                "Access-Control-Allow-Origin": "*",
            },
        };

        try {
            const { data } = await axios.get(
                `${basePersetujuanURL}/detail/${id}`,
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

//get detail User persetujuan
export const getDetailUserPersetujuanAction = createAsyncThunk(
    "persetujuan/getDetailUserPersetujuan",
    async (userId, { rejectWithValue, getState, dispatch }) => {
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
                `${basePersetujuanURL}/detail/user/${userId}`,
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

//Change status User persetujuan
export const changeStatusPersetujuanAction = createAsyncThunk(
    "persetujuan/changeStatus",
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
            const { data } = await axios.post(
                `${basePersetujuanURL}/${id}`,
                id,
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

//download
export const downloadFileAction = createAsyncThunk(
    "persetujuan/download",
    async (filename, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.auth?.userAuth;

        const config = {
            headers: {
                Authorization: `Bearer ${user?.token}`,
                "Access-Control-Allow-Origin": "*",
            },
        };

        try {
            const { data } = await axios.get(
                `${basePersetujuanURL}/download/${filename}`,
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

//Hapus persetujuan
export const deleteFileAction = createAsyncThunk(
    "persetujuan/delete",
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
                `${basePersetujuanURL}/${id}`,
                config,
            );

            dispatch(resetFileDeleteAction());

            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    },
);

//slices
const persetujuan = createSlice({
    name: {},
    initialState: {},
    extraReducers: (builder) => {
        //get all persetujuan
        builder.addCase(getAllPersetujuanAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllPersetujuanAction.fulfilled, (state, action) => {
            state.persetujuanList = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(getAllPersetujuanAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //get detail admin persetujuan
        builder.addCase(
            getDetailAdminPersetujuanAction.pending,
            (state, action) => {
                state.loading = true;
            },
        );
        builder.addCase(
            getDetailAdminPersetujuanAction.fulfilled,
            (state, action) => {
                state.detailAdminPersetujuan = action?.payload;
                state.loading = false;
                state.appError = undefined;
                state.serverError = undefined;
            },
        );
        builder.addCase(
            getDetailAdminPersetujuanAction.rejected,
            (state, action) => {
                state.loading = false;
                state.appError = action?.payload?.message;
                state.serverError = action?.error?.message;
            },
        );

        //get detail user persetujuan
        builder.addCase(
            getDetailUserPersetujuanAction.pending,
            (state, action) => {
                state.loading = true;
            },
        );
        builder.addCase(
            getDetailUserPersetujuanAction.fulfilled,
            (state, action) => {
                state.detailUserPersetujuan = action?.payload;
                state.loading = false;
                state.appError = undefined;
                state.serverError = undefined;
            },
        );
        builder.addCase(
            getDetailUserPersetujuanAction.rejected,
            (state, action) => {
                state.loading = false;
                state.appError = action?.payload?.message;
                state.serverError = action?.error?.message;
            },
        );

        //change status persetujuan
        builder.addCase(
            changeStatusPersetujuanAction.pending,
            (state, action) => {
                state.loading = true;
            },
        );
        builder.addCase(
            changeStatusPersetujuanAction.fulfilled,
            (state, action) => {
                state.changeStatus = action?.payload;
                state.loading = false;
                state.appError = undefined;
                state.serverError = undefined;
            },
        );
        builder.addCase(
            changeStatusPersetujuanAction.rejected,
            (state, action) => {
                state.loading = false;
                state.appError = action?.payload?.message;
                state.serverError = action?.error?.message;
            },
        );

        //download file
        builder.addCase(downloadFileAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(downloadFileAction.fulfilled, (state, action) => {
            state.downloadFilename = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(downloadFileAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //delete file
        builder.addCase(deleteFileAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(resetFileDeleteAction, (state, action) => {
            state.isDeleted = true;
        });
        builder.addCase(deleteFileAction.fulfilled, (state, action) => {
            state.deletedFile = action?.payload;
            state.loading = false;
            state.isDeleted = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(deleteFileAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });
    },
});

export default persetujuan.reducer;
