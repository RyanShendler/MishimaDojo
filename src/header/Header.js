import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const destroyNavbar = () => {
    setShowNavbar(false);
  };

  const location = useLocation(); //gets current route
  //destroy navbar if we take a link
  useEffect(() => {
    destroyNavbar();
  }, [location]);

  //reference to <div> element that wraps the navbar
  const navRef = useRef(null);
  //this is run whenever a click is registered
  //e.button===0 only closes navbar on left clicks
  const handleOutsideClicks = (e) => {
    if (
      showNavbar &&
      navRef.current &&
      !navRef.current.contains(e.target) &&
      e.button === 0
    ) {
      destroyNavbar();
    }
  };
  //when navbar is open, check for clicks outside of navbar
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClicks);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClicks);
    };
  }, [showNavbar]);

  //setting position to absolute allows scrollbar to go over header
  return (
    <header className="absolute inset-x-0 top-0 flex h-header-size flex-row items-center justify-between bg-header p-2">
      <div ref={navRef} className="fixed">
        {showNavbar && <Navbar destroyNavbar={() => destroyNavbar()} />}
      </div>
      <div className="">
        <svg
          className="cursor-pointer fill-[#CBD5E1] hover:bg-[#64748B]"
          id="nav-menu-icon"
          onClick={() => setShowNavbar(true)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="3rem"
        >
          <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z" />
        </svg>
      </div>
      <div className="absolute left-1/2">
        <Link to={"/"}>
          <h1 className="relative -left-1/2 whitespace-nowrap font-goldman text-5xl text-[#F1F5F9]">
            Mishima Dojo
          </h1>
        </Link>
      </div>
      <div className="pr-2">
        <Link to={"/search"}>
          <svg
            className="cursor-pointer fill-[#CBD5E1] hover:bg-[#64748B]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="2.5rem"
          >
            <path d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z" />
          </svg>
        </Link>
      </div>
    </header>
  );
};

export default Header;
