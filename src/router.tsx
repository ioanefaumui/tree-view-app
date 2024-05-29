import { createBrowserRouter } from "react-router-dom";
import { Assets } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Assets />,
  },
]);
