import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { basePeriodeURL } from "../../../utils/baseURL";

//Create Periode
export const createPeriode = createAsyncThunk(
    "periode/create",
    async (periode, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.auth?.userAuth;
        // console.log(user);

        const config = {
            headers: {
                Authorization: `Bearer ${user?.token}`,
                "Access-Control-Allow-Origin": "*",
            },
        };

        await new Promise((resolve) => setTimeout(resolve, 2000));

        try {
            const { data } = await axios.post(
                `${basePeriodeURL}`,
                periode,
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

//Create Periode
export const getPeriode = createAsyncThunk(
    "periode/get",
    async (periode, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.auth?.userAuth;
        // console.log(user);

        const config = {
            headers: {
                Authorization: `Bearer ${user?.token}`,
                "Access-Control-Allow-Origin": "*",
            },
        };

        // await new Promise((resolve) => setTimeout(resolve, 2000));

        try {
            const { data } = await axios.get(`${basePeriodeURL}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const periode = createSlice({
    name: {},
    initialState: {},
    extraReducers: (builder) => {
        //Create Periode
        builder.addCase(createPeriode.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createPeriode.fulfilled, (state, action) => {
            state.periode = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(createPeriode.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //Get Periode
        builder.addCase(getPeriode.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getPeriode.fulfilled, (state, action) => {
            state.getPeriode = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(getPeriode.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });
    },
});

export default periode.reducer;
