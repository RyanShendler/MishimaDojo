import { Link } from "react-router-dom";
import NavbarEntry from "./NavbarEntry";

const Navbar = ({ destroyNavbar }) => {
  //tabIndex=0 allows an element to have focus(watch out if element children are focusable)
  return (
    <nav className="w-100 fixed inset-y-0 left-0 z-10 flex w-72 flex-col justify-start bg-header">
      <div className="flex h-header-size flex-row items-center bg-[#313f52] p-2">
        <svg
          className="cursor-pointer fill-[#CBD5E1] hover:bg-[#64748B]"
          id="navbar-icon"
          onClick={() => destroyNavbar()}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="3rem"
        >
          <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z" />
        </svg>
      </div>
      <ul className="">
        <NavbarEntry path={"/"} name={"Roster"} />
        <NavbarEntry path={"/legend"} name={"Legend"} />
        <NavbarEntry path={"/tier"} name={"Tier List"} />
      </ul>
    </nav>
  );
};

export default Navbar;
