import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web`

// Importing reducers
import { dataTableReducer, modalReducer } from "../slices/personalTodoSlice";
import snackMessageReducer from "../slices/snackMessageSlice";
import authUserReducer from "../slices/authSlice";

// Combning reducers
const personalTodo = combineReducers({
  dataTable: dataTableReducer,
  modal: modalReducer,
});

// Redux persist variable
// const persistConfig = {
//   key: "user",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, authUserReducer);

export const store = configureStore({
  reducer: {
    personalTodo,
    snackMessage: snackMessageReducer,
    authUser: authUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializableCheck for redux-persist actions
    }),
});

// export const persistor = persistStore(store);
