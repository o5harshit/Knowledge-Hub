import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Auth from "./components/Auth";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import Home from "./components/Home";
import DocumentForm from "./Pages/DocumentForm";
import AppRoot from "@/config/AppRoot";
import ProtectedAuthRoute from "./config/ProtectedAuthRoute";
import { PrivateRoute } from "./config/PrivateRoute";
import UserDocuments from "./Pages/UserDocuments";
import TeamQA from "./Pages/TeamQA";
import GetallDocuments from "./Pages/GetallDocuments";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const browseRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "userLogin",
        element: <ProtectedAuthRoute><Auth /></ProtectedAuthRoute>,
      },
      {
        path: "home",
        element: <PrivateRoute><Dashboard/></PrivateRoute>,
      },
      {
        path: "AddDocument",
        element: <PrivateRoute><DocumentForm /></PrivateRoute>,
      },
      {
        path: "YourDocument",
        element: <PrivateRoute><UserDocuments/></PrivateRoute>,
      },
      {
        path: "AllDocument",
        element: <PrivateRoute><GetallDocuments/></PrivateRoute>,
      },
      {
        path: "TeamQA",
        element: <PrivateRoute><TeamQA/></PrivateRoute>,
      },
        {
        path: "GetallDocuments",
        element: <PrivateRoute><GetallDocuments/></PrivateRoute>,
      },
        {
        path: "adminLogin",
        element: <ProtectedAuthRoute><Login/></ProtectedAuthRoute>,
      },
      {
        path: "*",
        element: <Navigate to="/userLogin" replace />,
      },
       {
        path: "/",
        element: <Navigate to="/userLogin" replace />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster closeButton />
    <Provider store={store}>
      <AppRoot>
        <RouterProvider router={browseRoutes} />
      </AppRoot>
    </Provider>
  </StrictMode>
);
