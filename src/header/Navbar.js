import { Link } from "react-router-dom";
import NavbarEntry from "./NavbarEntry";

const Navbar = ({ destroyNavbar }) => {
  //tabIndex=0 allows an element to have focus(watch out if element children are focusable)
  return (
    <nav className="w-100 fixed inset-y-0 left-0 flex w-72 flex-col justify-start bg-slate-600">
      <div className="flex h-header-size flex-row items-center p-2">
        <svg
          className="cursor-pointer hover:bg-slate-400"
          id="navbar-icon"
          onClick={() => destroyNavbar()}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="3rem"
        >
          <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z" />
        </svg>
      </div>
      <hr className="h-[1px] border-0 bg-black" />
      <ul className="">
        <NavbarEntry path={"/"} name={"Roster"} />
        <NavbarEntry path={"/legend"} name={"Legend"} />
      </ul>
    </nav>
  );
};

export default Navbar;
