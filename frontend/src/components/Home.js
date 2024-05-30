import { IoTrashOutline, IoPencilOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBtns from "./NavBtns";
import axios from "axios";
import { Navigate, Outlet } from "react-router";
import Header from "./Header";
import { storeQuestion, removeQuestion, removeFrommyQuestion } from "../store";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const dispatch = useDispatch();

  const location = useLocation();

  const [error, setError] = useState("");

  const { user, token, data } = useSelector((state) => {
    return {
      token: state.auth.token,
      data: state.question.data,
      user: state.auth.user,
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/questions");
        dispatch(storeQuestion(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  const handleDelete = async (question) => {
    const response = await axios.delete(
      `http://localhost:5000/api/questions/${question._id}`
    );

    dispatch(removeQuestion(question._id));
    dispatch(removeFrommyQuestion(question._id));

    {
      toast.error("Question Deleted Succesfully!", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const renderedQuestions = data?.map((question) => {
    return (
      <div key={question._id}>
        <div className="questions__box">
          <div className="questions__box-icons-container">
            {user._id === question.userId._id && (
              <>
                <Link to={`/home/editquestion/${question._id}`}>
                  <IoPencilOutline className="questions__box-icon edit" />
                </Link>
                <IoTrashOutline
                  onClick={() => handleDelete(question)}
                  className="questions__box-icon del"
                />
              </>
            )}
          </div>

          <div className="question__user">
            <h3>{question.title}</h3>
            <h5 className="user_question">
              Question Asked By{" "}
              <span>
                {question.userId?.name[0]?.toUpperCase() +
                  question.userId?.name?.slice(1)}
              </span>
            </h5>
          </div>

          <p className="question__text">{question.description}</p>
          <Link
            className="question__link"
            to={`/home/singlequestion/${question._id}`}
          >
            See Question
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="home__flex">
        <Header>CodeNexTech</Header>
        <NavBtns />
      </div>

      <div>
        <Outlet />
      </div>

      <ToastContainer />

      <div className="questions__grid">
        {location.pathname === "/home" && renderedQuestions}
      </div>
    </div>
  );
}

export default Home;
