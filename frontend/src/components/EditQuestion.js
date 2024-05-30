import { IoPencilOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { storeQuestion } from "../store";

function EditQuestion() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { id } = useParams();

  const { data } = useSelector((state) => {
    return {
      data: state.question.data,
    };
  });

  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/questions/${id}`
        );

        const questionData = response.data;

        setEditedTitle(questionData.title);
        setEditedDescription(questionData.description);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  const handleTitle = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleDes = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/questions/${id}`,
        {
          title: editedTitle,
          description: editedDescription,
        }
      );

      dispatch(storeQuestion(response.data));

      navigate("/home");

      {
        toast.success("Question Edited Succesfully!", {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="icon__heading-container">
          <IoPencilOutline className="lr-icon" />
          <h2 className="heading__3">Edit Your Question</h2>
        </div>
        <form onSubmit={handleUpdate}>
          <label className="input__label">Title</label>
          <br />
          <input
            onChange={handleTitle}
            type="text"
            className="input__field"
            value={editedTitle}
          />
          <br />
          <label className="input__label">Description</label> <br />
          <input
            onChange={handleDes}
            type="text"
            className="input__field"
            value={editedDescription}
          />{" "}
          <br />
          <div className="form__btn">
            <button className="input__btn">Edit Question</button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EditQuestion;
