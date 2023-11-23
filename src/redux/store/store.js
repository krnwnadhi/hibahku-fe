import authReducer from "../slices/auth/authSlices";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user/userSlices";

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
    },
    // devTools: false,
});

export default store;
