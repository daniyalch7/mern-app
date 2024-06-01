import { IoPersonCircleOutline } from "react-icons/io5";
import Header from "./Header";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  registerName,
  registerEmail,
  registerPassword,
  registerConfirmPassword,
  storeUserData,
} from "../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();

  const { name, email, password, confirmPassword, token } = useSelector(
    (state) => {
      return {
        name: state.register.regName,
        email: state.register.regEmail,
        password: state.register.regPassword,
        confirmPassword: state.register.regConfirmPassword,
        token: state.auth.token,
      };
    }
  );

  const handleName = (event) => {
    dispatch(registerName(event.target.value));
  };

  const handleEmail = (event) => {
    dispatch(registerEmail(event.target.value));
  };

  const handlePassword = (event) => {
    dispatch(registerPassword(event.target.value));
  };

  const handleConfirmPassword = (event) => {
    dispatch(registerConfirmPassword(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.error("Please fill the required fields!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const response = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });

      console.log(response);

      dispatch(storeUserData(response.data));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
  };

  if (token) {
    return <Navigate to={"/home"} replace />;
  }

  return (
    <div>
      <div className="for-flex">
        <Header>CodeNexTech</Header>
        <Link className="btn__link" to={"/login"}>
          Login
        </Link>
      </div>

      <div className="container">
        <div className="icon__heading-container">
          <IoPersonCircleOutline className="lr-icon" />
          <h2 className="heading__3">Register</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="input__label">Name</label> <br />
          <input
            onChange={handleName}
            type="text"
            className="input__field"
            value={name}
          />{" "}
          <br />
          <label className="input__label">Email</label> <br />
          <input
            onChange={handleEmail}
            type="email"
            className="input__field"
            value={email}
          />{" "}
          <br />
          <label className="input__label">Password</label> <br />
          <input
            onChange={handlePassword}
            type="password"
            className="input__field"
            value={password}
          />{" "}
          <br />
          <label className="input__label">Confirm Password</label> <br />
          <input
            onChange={handleConfirmPassword}
            type="password"
            className="input__field"
            value={confirmPassword}
          />
          <div className="form__btn">
            <button
              className={`${
                name.length > 0 &&
                email.length > 0 &&
                password.length > 0 &&
                password === confirmPassword
                  ? "input__btn"
                  : "disabled__btn"
              }`}
            >
              Register
            </button>
          </div>
        </form>
        <ToastContainer />

        <Link className="move__link" to={"/login"}>
          Have an account. Login!
        </Link>
      </div>
    </div>
  );
}

export default Register;
