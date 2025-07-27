import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "../Pages/Layout/Layout";

export const router = createBrowserRouter ([
    {
        path:'/',
        element: <Layout/>
    }
])