import { Link } from "react-router-dom";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

function Hero() {
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });

  if (token) {
    return <Navigate to={"/home"} replace />;
  }

  return (
    <section className="hero__img">
      <div className="hero__overlay">
        <div className="hero__flex">
          <div>
            <h1 className="heading__2">
              Every developer has a tab <br /> open to CodeNexTech
            </h1>
            <div className="options">
              <Link to={"/login"} className="login__btn">
                Login
              </Link>
              <Link to={"/register"} className="register__btn">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
