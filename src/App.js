import { createHashRouter, RouterProvider } from "react-router-dom";
import News from "./components/News";
import Home from "./components/Home";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/news/:category",
    element: <News />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
