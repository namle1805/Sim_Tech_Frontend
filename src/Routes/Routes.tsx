import { createBrowserRouter } from "react-router-dom";
import Layout from "../Pages/Layout/Layout";
import ItemPage from "../Pages/Item/ItemPage";
import TemplatePage from "../Pages/Template/TemplatePage";
import TechlogManagementPage from "../Pages/TechlogManagement/TechlogManagementPage";
import UserPage from "../Pages/User/UserPage";
import WarehouseManagementPage from "../Pages/WarehouseManagement/WarehouseManagementPage";
import ReportManagementPage from "../Pages/ReportManagement/ReportManagementPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ItemPage />,
      },
      {
        path: "template",
        element: <TemplatePage />,
      },
      {
        path: "techlog-management",
        element: <TechlogManagementPage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "warehouse-management",
        element: <WarehouseManagementPage />,
      },
      {
        path: "report-management",
        element: <ReportManagementPage />,
      },
    ],
  },
]);
