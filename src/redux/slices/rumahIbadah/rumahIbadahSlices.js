import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { baseRumahIbadahURL } from "../../../utils/baseURL";

//get All User
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
        //fetch all user
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
    },
});

export default rumahIbadah.reducer;
