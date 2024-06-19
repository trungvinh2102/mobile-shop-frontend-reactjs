import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./reducers/cart";
import authReducer from "./reducers/auth"

const persistConfig = {
    key: "vietpro",
    storage,
};
const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
    reducer: {
        Cart: persistedCartReducer,
        Auth: persistedAuthReducer
    }
});
export const persistor = persistStore(store);