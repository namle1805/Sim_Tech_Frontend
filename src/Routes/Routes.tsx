import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "../Components/Layout/Layout";

export const router = createBrowserRouter ([
    {
        path:'/',
        element: <Layout/>
    }
])