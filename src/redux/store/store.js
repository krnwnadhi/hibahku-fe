import authReducer from "../slices/auth/authSlices";
import { configureStore } from "@reduxjs/toolkit";
import rumahIbadahReducer from "../slices/rumahIbadah/rumahIbadahSlices";
import userReducer from "../slices/user/userSlices";

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        rumahIbadah: rumahIbadahReducer,
    },
    // devTools: false,
});

export default store;
