import { Outlet } from "react-router-dom";
import Header from "./header/Header";

//Outlet is the current child route(Roster, Legend, Techniques, etc.)
const Layout = () => {
  return (
    <div id="page-wrapper" className="fixed inset-0 bg-[#F4F7FA]">
      <Header />
      <div
        id="body-wrapper"
        className="absolute inset-x-0 bottom-0 top-header-size -z-10 overflow-y-auto"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
