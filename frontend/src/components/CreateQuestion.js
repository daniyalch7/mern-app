import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { IoCreateOutline } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router";
import { addTitle, addDescription, singleQuestion } from "../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateQuestion() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const { user, token, title, description } = useSelector((state) => {
    return {
      user: state.auth.user,
      token: state.auth.token,
      title: state.question.title,
      description: state.question.description,
    };
  });

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  const handleTitle = (event) => {
    dispatch(addTitle(event.target.value));
  };

  const handleDescription = (event) => {
    dispatch(addDescription(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/questions",
        {
          title,
          description,
        },
        config
      );

      console.log(response);

      dispatch(singleQuestion(response.data));
      dispatch(addTitle(""));
      dispatch(addDescription(""));

      navigate("/home");

      {
        toast.success("Question Created Succesfully!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="container">
      {error.length > 0 && <div className="err__message">{error}</div>}
      <div className="icon__heading-container">
        <IoCreateOutline className="lr-icon" />
        <h2 className="heading__3">Create Your Question</h2>
      </div>
      <div className="question__box">
        <form onSubmit={handleSubmit}>
          <label className="input__label">Title</label> <br />
          <input
            onChange={handleTitle}
            type="text"
            className="input__field"
            value={title}
          />
          <br />
          <label className="input__label">Description</label> <br />
          <input
            onChange={handleDescription}
            className="input__field"
            type="text"
            value={description}
          />
          <br />
          <button className="input__btn">Create Question</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default CreateQuestion;
