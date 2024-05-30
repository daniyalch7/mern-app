import EditAnswer from "./EditAnswer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  IoCreateOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";

import {
  getSingleQuestion,
  addAnswer,
  storeSingleAnswer,
  storeAllAnswers,
  removeAnswer,
  storeEditAnswerId,
} from "../store";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SingleQuestion() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { singleQuestion, answer, token, questionAsnwers, user, editAnswerId } =
    useSelector((state) => {
      return {
        singleQuestion: state.question.singleQuestion,
        answer: state.question.answer,
        questionAsnwers: state.question.questionAsnwers,
        token: state.auth.token,
        user: state.auth.user,
        editAnswerId: state.question.editAnswerId,
      };
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/questions/${id}`
        );

        dispatch(getSingleQuestion(response.data));

        if (response.data) {
          const secondApiResponse = await axios.get(
            "http://localhost:5000/api/answers"
          );
          dispatch(storeAllAnswers(secondApiResponse.data));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  const [showModal, setShowModal] = useState(false);

  const renderedQuestion = (
    <div className="singleQues__container">
      <h1 className="singleQues__title">{singleQuestion?.title}</h1>
      <h3 className="singleQues__des">{singleQuestion?.description}</h3>
    </div>
  );

  const handleAnswerText = (event) => {
    dispatch(addAnswer(event.target.value));
  };

  const handleAnswer = async (event) => {
    event.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/answers`,
        {
          text: answer,
          questionId: id,
        },
        config
      );

      dispatch(storeSingleAnswer(response.data));

      {
        toast.info("Your answer has been added!", {
          position: "bottom-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAnswer = async (ans) => {
    const response = await axios.delete(
      `http://localhost:5000/api/answers/${ans._id}`
    );

    dispatch(removeAnswer(ans._id));

    {
      toast.error("Answer Deleted Succesfully!", {
        position: "bottom-right",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleModal = (ans) => {
    dispatch(storeEditAnswerId(ans._id));
    setShowModal(!showModal);
  };

  const renderedAnswers = questionAsnwers?.map((ans) => {
    const content = (
      <li key={ans._id} className="answers__list">
        <span>{ans.text}</span>
        <span>
          {user._id === ans.userId && (
            <>
              <IoPencilOutline
                className="ans__icon edit"
                onClick={() => handleModal(ans)}
              />
              <IoTrashOutline
                className="ans__icon del"
                onClick={() => handleDeleteAnswer(ans)}
              />
            </>
          )}
        </span>
      </li>
    );
    return id === ans.questionId && content;
  });

  return (
    <div>
      <div>{renderedQuestion}</div>
      <div className="container">
        <div className="icon__heading-container">
          <IoCreateOutline className="lr-icon" />
          <h3 className="heading__3">
            Want to answer the following question ?
          </h3>
        </div>

        <form onSubmit={handleAnswer}>
          <label className="input__label">Answer:</label> <br />
          <input
            onChange={handleAnswerText}
            type="text"
            className="input__field"
            value={answer}
          />
          <br />
          <button className="answer__btn">Submit Answer</button>
        </form>
      </div>
      <div className="user__answer">
        <h3>Previous Answers</h3>
      </div>

      <ul className="answers__list-container">{renderedAnswers}</ul>
      <ToastContainer />

      {showModal && <EditAnswer id={id} />}
    </div>
  );
}

export default SingleQuestion;
