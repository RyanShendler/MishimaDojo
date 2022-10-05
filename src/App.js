import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Header";
import Legend from "./Legend";
import Roster from "./Roster";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roster />,
  },
  {
    path: "/legend",
    element: <Legend />,
  },
]);
const App = () => {
  return (
    <StrictMode>
      <div title="page-wrapper">
        <Header />
        <div title="body-wrapper" className="pt-header-size">
          <RouterProvider router={router} />
        </div>
      </div>
    </StrictMode>
  );
};

export default App;
