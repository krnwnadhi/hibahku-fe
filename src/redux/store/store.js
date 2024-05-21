import authReducer from "../slices/auth/authSlices";
import { configureStore } from "@reduxjs/toolkit";
import periodeReducer from "../slices/periode/periodeSlices";
import permohonanReducer from "../slices/permohonan/permohonanSlices";
import persetujuanReducer from "../slices/persetujuan/persetujuanSlices";
import rumahIbadahReducer from "../slices/rumahIbadah/rumahIbadahSlices";
import userReducer from "../slices/user/userSlices";

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        rumahIbadah: rumahIbadahReducer,
        permohonan: permohonanReducer,
        persetujuan: persetujuanReducer,
        periode: periodeReducer,
    },
    devTools: false,
});

export default store;
