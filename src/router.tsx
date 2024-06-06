import { createBrowserRouter } from "react-router-dom";
import { Assets } from "./pages";
import { MainLayout } from "./layouts";

export const router = createBrowserRouter([
  {
    path: "/ativos",
    element: <MainLayout />,
    children: [
      {
        path: "/ativos/:id",
        element: <Assets />,
      },
    ],
  },
]);
