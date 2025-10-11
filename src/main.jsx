import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";
// Store
import { store } from "./app/redux-config/store";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// VIEW COMPONENTS
import Dashboard from "./components/views/dashboards/Dashboard.jsx";
import PersonalTodoIndex from "./components/views/personal-todo/PersonalTodoIndex.jsx";
import WorkTodoIndex from "./components/views/work-todo/WorkTodoIndex.jsx";
import Login from "./components/views/auth/Login.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<App />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/todo-list/personal" element={<PersonalTodoIndex />} />
        <Route path="/todo-list/work" element={<WorkTodoIndex />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_LOGIN_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </Provider>
);
