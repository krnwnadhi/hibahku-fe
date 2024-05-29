import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { basePermohonanURL } from "../../../utils/baseURL";

//Create permohonan
export const createPermohonan = createAsyncThunk(
    "permohonan/create",
    async (permohonan, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.auth?.userAuth;

        const config = {
            headers: {
                Authorization: `Bearer ${user?.token}`,
                "Access-Control-Allow-Origin": "*",
                "Content-type": "multipart/form-data",
            },
        };

        await new Promise((resolve) => setTimeout(resolve, 2000));

        try {
            const formData = new FormData();
            formData.append("keagamaanid", permohonan?.keagamaanid);
            formData.append("tujuan", permohonan?.tujuan);
            formData.append("pengajuandana", permohonan?.pengajuandana);
            formData.append("norek", permohonan?.norek);
            formData.append("file_ktp", permohonan?.file_ktp);
            formData.append("file_rab", permohonan?.file_rab);
            formData.append("file_suket", permohonan?.file_suket);
            formData.append("file_sk", permohonan?.file_sk);
            formData.append("file_proposal", permohonan?.file_proposal);
            formData.append(
                "file_suratpermohonan",
                permohonan?.file_suratpermohonan
            );
            formData.append("file_asetrekom", permohonan?.file_asetrekom);
            formData.append(
                "file_izinoperasional",
                permohonan?.file_izinoperasional
            );
            formData.append(
                "file_aktapendirian",
                permohonan?.file_aktapendirian
            );
            formData.append(
                "file_pengesahankemenkumham",
                permohonan?.file_pengesahankemenkumham
            );

            const { data } = await axios.post(
                `${basePermohonanURL}/uploads`,
                formData,
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

//SLICES

const permohonanSlices = createSlice({
    name: "permohonan",
    initialState: {},

    extraReducers: (builder) => {
        //create permohonan
        builder.addCase(createPermohonan.pending, (state, action) => {
            state.loading = true;
            state.isCreated = true;
        });

        builder.addCase(createPermohonan.fulfilled, (state, action) => {
            state.permohonanCreated = action?.payload;
            state.loading = false;
            state.isCreated = false;
            state.appError = undefined;
            state.serverError = undefined;
        });
        builder.addCase(createPermohonan.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError =
                action?.error?.message === "Rejected"
                    ? "File PDF Terlalu Besar! Maksimal 5MB!"
                    : "Server Error!";
        });
    },
});

export default permohonanSlices.reducer;
