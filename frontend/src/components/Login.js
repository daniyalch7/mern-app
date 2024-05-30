import { IoLogInOutline } from "react-icons/io5";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userEmail, userPassword, storeUserData } from "../store";
import Header from "./Header";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const { email, password, token } = useSelector((state) => {
    return {
      email: state.login.userEmail,
      password: state.login.userPassword,
      token: state.auth.token,
    };
  });

  const handleEmail = (event) => {
    dispatch(userEmail(event.target.value));
  };

  const handlePassword = (event) => {
    dispatch(userPassword(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      dispatch(storeUserData(response.data));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch(userEmail(""));
      dispatch(userPassword(""));
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  if (token) {
    return <Navigate to={"/home"} replace />;
  }

  return (
    <div>
      <div className="for-flex">
        <Header>CodeNexTech</Header>
        <Link className="btn__link" to={"/register"}>
          Register
        </Link>
      </div>
      <div className="container">
        {error.length > 0 && <div className="err__message">{error}</div>}
        <div className="icon__heading-container">
          <IoLogInOutline className="lr-icon" />
          <h2 className="heading__3">Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
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
          />
          <div className="form__btn">
            <button
              className={`${
                email.length && password.length > 0
                  ? "input__btn"
                  : "disabled__btn"
              }`}
            >
              Login
            </button>
          </div>
        </form>
        <Link className="move__link" to={"/register"}>
          Doesn't have an account. Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
