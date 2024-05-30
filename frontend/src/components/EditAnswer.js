import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { IoCreateOutline } from "react-icons/io5";
import axios from "axios";
import { storeAllAnswers } from "../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditAnswer({ id }) {
  const [open, setOpen] = useState(true);
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { editAnswerId } = useSelector((state) => {
    return {
      editAnswerId: state.question.editAnswerId,
    };
  });

  const hanldeNoBtn = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/answers/${editAnswerId}`
        );

        const editAnswerData = response.data;
        setAnswer(editAnswerData.text);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  const handleAnswer = (event) => {
    setAnswer(event.target.value);
  };

  const handleUpdateAnswer = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/answers/${editAnswerId}`,
        {
          text: answer,
        }
      );

      setOpen(false);

      dispatch(storeAllAnswers(response.data));

      navigate(`/home/singlequestion/${id}`);

      {
        toast.info("Your answer is edited!", {
          position: "bottom-right",
          autoClose: 500,
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
    open && (
      <div className="model-container-parent">
        <div className="model-container">
          <IoCreateOutline className="lr-icon mb--2" />
          <h2>Edit Your Question</h2>
          <div className="btns-container">
            <form onSubmit={handleUpdateAnswer}>
              <label className="input__label">Asnwer:</label>
              <br />
              <input
                onChange={handleAnswer}
                type="text"
                className="input__field"
                value={answer}
              />{" "}
              <br />
              <div className="ansedit__container">
                <button className="answer__btn">Submit</button>
                <button onClick={hanldeNoBtn} className="answer__btn no">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  );
}

export default EditAnswer;
