import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { baseRumahIbadahURL } from "../../../utils/baseURL";

//Get All
export const getAllRumahIbadahAction = createAsyncThunk(
    "rumahIbadah/getAll",
    async (data, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.auth?.userAuth;
        // console.log(user);

        const config = {
            headers: {
                Authorization: `Bearer ${user?.token}`,
                "Access-Control-Allow-Origin": "*",
            },
        };

        try {
            const { data } = await axios.get(
                `${baseRumahIbadahURL}/list`,
                config
            );
            // await new Promise((resolve) => setTimeout(resolve(data), 2000));
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//Create Masjid
export const createRumahIbadahAction = createAsyncThunk(
    "rumahIbadah/create",
    async (dataRumahIbadah, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.auth?.userAuth;
        // console.log(user);

        const config = {
            headers: {
                Authorization: `Bearer ${user?.token}`,
                "Access-Control-Allow-Origin": "*",
            },
        };

        try {
            const { data } = await axios.post(
                `${baseRumahIbadahURL}/create`,
                dataRumahIbadah,
                config
            );
            // await new Promise((resolve) => setTimeout(resolve(data), 5000));
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const rumahIbadah = createSlice({
    name: {},
    initialState: {},
    extraReducers: (builder) => {
        //fetch all masjid
        builder.addCase(getAllRumahIbadahAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllRumahIbadahAction.fulfilled, (state, action) => {
            state.rumahIbadahList = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(getAllRumahIbadahAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });

        //create masjid
        builder.addCase(createRumahIbadahAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createRumahIbadahAction.fulfilled, (state, action) => {
            state.createRumahIbadah = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(createRumahIbadahAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });
    },
});

export default rumahIbadah.reducer;
