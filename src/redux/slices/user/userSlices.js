import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { baseUserURL } from "../../../utils/baseURL";

//get All User
export const getAllUsersAction = createAsyncThunk(
    "user/getAll",
    async (data, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.auth?.userAuth;
        console.log(user);

        const config = {
            headers: {
                Authorization: `Bearer ${user?.token}`,
                "Access-Control-Allow-Origin": "*",
            },
        };

        try {
            const { data } = await axios.get(`${baseUserURL}/getusers`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const userSlices = createSlice({
    name: {},
    initialState: {},
    extraReducers: (builder) => {
        //fetch all user
        builder.addCase(getAllUsersAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllUsersAction.fulfilled, (state, action) => {
            state.userList = action?.payload;
            state.loading = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(getAllUsersAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message;
        });
    },
});

export default userSlices.reducer;
