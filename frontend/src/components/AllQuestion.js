import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { IoListCircleOutline } from "react-icons/io5";
import { myQuestions, removeQuestion, removeFrommyQuestion } from "../store";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllQuestion() {
  const dispatch = useDispatch();

  const location = useLocation();

  const { token, data, allMyQuestions } = useSelector((state) => {
    return {
      token: state.auth.token,
      data: state.question.data,
      allMyQuestions: state.question.allMyQuestions,
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(
          "http://localhost:5000/api/questions/myquestions",
          config
        );

        dispatch(myQuestions(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  const handleDelete = async (ques) => {
    const response = await axios.delete(
      `http://localhost:5000/api/questions/${ques._id}`
    );

    dispatch(removeQuestion(ques._id));
    dispatch(removeFrommyQuestion(ques._id));

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

  const renderedUserQuestions = allMyQuestions?.map((ques) => {
    return (
      <tr key={ques._id}>
        <td>{ques.title}</td>
        <td>{ques.description}</td>
        <td>
          <Link to={`/home/editquestion/${ques._id}`} className="edit__btn">
            Edit
          </Link>
        </td>
        <td>
          <button onClick={() => handleDelete(ques)} className="delete__btn">
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="container">
      <div className="icon__heading-container">
        <IoListCircleOutline className="lr-icon" />
        <h2 className="heading__3">Your Questions</h2>
      </div>
      <table className="table__container">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>{renderedUserQuestions}</tbody>
      </table>

      <ToastContainer />
    </div>
  );
}

export default AllQuestion;
