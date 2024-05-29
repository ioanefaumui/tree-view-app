import { createBrowserRouter } from "react-router-dom";
import { Assets } from "./pages";
import { MainLayout } from "./layouts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Assets />,
      },
    ],
  },
]);
