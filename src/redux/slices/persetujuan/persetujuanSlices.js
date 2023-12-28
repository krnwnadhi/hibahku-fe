import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { basePersetujuanURL } from "../../../utils/baseURL";

// //action to redirect
// const resetcreatePermohonanAction = createAction("permohonan/create/reset");

//get all persetujuan
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
export const getDetailUserPersetujuanAction = createAsyncThunk(
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
            }
        );
        builder.addCase(
            getDetailAdminPersetujuanAction.fulfilled,
            (state, action) => {
                state.detailAdminPersetujuan = action?.payload;
                state.loading = false;
                state.appError = undefined;
                state.serverError = undefined;
            }
        );
        builder.addCase(
            getDetailAdminPersetujuanAction.rejected,
            (state, action) => {
                state.loading = false;
                state.appError = action?.payload?.message;
                state.serverError = action?.error?.message;
            }
        );

        //get detail user persetujuan
        builder.addCase(
            getDetailUserPersetujuanAction.pending,
            (state, action) => {
                state.loading = true;
            }
        );
        builder.addCase(
            getDetailUserPersetujuanAction.fulfilled,
            (state, action) => {
                state.detailUserPersetujuan = action?.payload;
                state.loading = false;
                state.appError = undefined;
                state.serverError = undefined;
            }
        );
        builder.addCase(
            getDetailUserPersetujuanAction.rejected,
            (state, action) => {
                state.loading = false;
                state.appError = action?.payload?.message;
                state.serverError = action?.error?.message;
            }
        );
    },
});

export default persetujuan.reducer;
