import { Link } from "react-router-dom";

import { NavLinkProps } from "../interfaces";

function NavLink({ path, text }: NavLinkProps) {
  return (
    <Link to={path}>
      <button className="Lexend mt-4 bg-purple px-4 py-2 rounded-xl hover:bg-[#300D38] text-white">
        {text}
      </button>
    </Link>
  );
}

export default NavLink;
