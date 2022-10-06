import { Link } from "react-router-dom";

const NavbarEntry = ({ name, path }) => {
  return (
    <li className="flex flex-row items-center justify-center py-2 hover:bg-slate-400">
      <Link className="text-2xl text-white" to={path}>
        {name}
      </Link>
    </li>
  );
};

export default NavbarEntry;
