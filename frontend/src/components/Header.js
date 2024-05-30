import { IoTrashOutline, IoPencilOutline, IoCodeSlash } from "react-icons/io5";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header({ children }) {
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });

  return (
    <div className="nav__flex">
      <Link className="hero_link" to={token ? "/home" : "/"}>
        <div className="logo__container">
          <IoCodeSlash className="logo" />
          <h1 className="heading__1">{children}</h1>
        </div>
      </Link>
    </div>
  );
}

export default Header;
