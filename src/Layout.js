import { Outlet } from "react-router-dom";
import Header from "./header/Header";

//Outlet is the current child route(Roster, Legend, Techniques, etc.)
const Layout = () => {
  return (
    <div id="page-wrapper" className="fixed inset-0 overflow-auto bg-gray-100">
      <Header />
      <div id="body-wrapper" className="pt-header-size">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
