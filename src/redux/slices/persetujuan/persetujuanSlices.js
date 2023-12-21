import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { basePersetujuanURL } from "../../../utils/baseURL";

// //action to redirect
// const resetcreatePermohonanAction = createAction("permohonan/create/reset");

//get all persetujuan
export const getAllPersetujuan = createAsyncThunk(
    "persetujuan/getAllPersetujuan",
    async (data, { rejectWithValue, getState, dispatch }) => {
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
                `${basePersetujuanURL}/list`,
                config
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//get detail admin persetujuan
export const getDetailAdminPersetujuan = createAsyncThunk(
    "persetujuan/getDetailAdminPersetujuan",
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
                `${basePersetujuanURL}/detail/${id}`,
                config
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//get detail User persetujuan
export const getDetailUserPersetujuan = createAsyncThunk(
    "persetujuan/getDetailUserPersetujuan",
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
                `${basePersetujuanURL}/detail/user/${id}`,
                config
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//slices
const persetujuan = createSlice({
    name: {},
    initialState: {},
    extraReducers: (builder) => {
        //get all persetujuan
        builder.addCase(getAllPersetujuan.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllPersetujuan.fulfilled, (state, action) => {
            state.persetujuanList = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(getAllPersetujuan.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //get detail admin persetujuan
        builder.addCase(getDetailAdminPersetujuan.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(
            getDetailAdminPersetujuan.fulfilled,
            (state, action) => {
                state.detailAdminPersetujuan = action?.payload;
                state.loading = false;
                state.appError = undefined;
                state.serverError = undefined;
            }
        );
        builder.addCase(getDetailAdminPersetujuan.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //get detail user persetujuan
        builder.addCase(getDetailUserPersetujuan.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getDetailUserPersetujuan.fulfilled, (state, action) => {
            state.detailUserPersetujuan = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(getDetailUserPersetujuan.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });
    },
});

export default persetujuan.reducer;
