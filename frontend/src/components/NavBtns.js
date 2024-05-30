import { useDispatch } from "react-redux";
import { logoutUser } from "../store/slices/authSlice";
import { Link } from "react-router-dom";
import { removeDepedencies } from "../store";

function NavBtns() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
    dispatch(removeDepedencies());
  };

  return (
    <div className="nav__btns-container">
      <Link className="nav__btns create" to="createquestion">
        Create Question
      </Link>
      <Link className="nav__btns mine" to="allquestion">
        My Questions
      </Link>
      <Link className="nav__btns logout" onClick={handleClick}>
        Logout
      </Link>
    </div>
  );
}

export default NavBtns;
