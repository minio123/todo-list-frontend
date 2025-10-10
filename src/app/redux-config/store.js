import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web`

// Importing reducers
import { todoReducer } from "../slices/todoSlice";
import snackMessageReducer from "../slices/snackMessageSlice";
import authUserReducer from "../slices/authSlice";
import { dataTableReducer } from "../slices/dataTableSlice";

// Redux persist variable
// const persistConfig = {
//   key: "user",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, authUserReducer);

export const store = configureStore({
  reducer: {
    snackMessage: snackMessageReducer,
    authUser: authUserReducer,
    dataTable: dataTableReducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializableCheck for redux-persist actions
    }),
});

// export const persistor = persistStore(store);
