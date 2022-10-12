import { Link } from "react-router-dom";

const NavbarEntry = ({ name, path }) => {
  return (
    <Link to={path}>
      <li className="flex flex-row items-center justify-center py-2 text-2xl text-[#F1F5F9] hover:bg-slate-400">
        {name}
      </li>
    </Link>
  );
};

export default NavbarEntry;
