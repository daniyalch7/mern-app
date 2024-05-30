import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    title: "",
    description: "",
    answer: "",
    data: [],
    questionAsnwers: [],
    allMyQuestions: [],
    singleQuestion: null,
    editAnswerId: "",
  },
  reducers: {
    addTitle(state, action) {
      state.title = action.payload;
    },

    addDescription(state, action) {
      state.description = action.payload;
    },

    storeQuestion(state, action) {
      // Update Question
      const dataIndex = state.data.findIndex(
        (ques) => ques._id === action.payload._id
      );

      if (dataIndex !== -1) {
        state.data[dataIndex] = action.payload;
      } else {
        // New Question
        state.data.push(...action.payload);
      }
    },

    singleQuestion(state, action) {
      state.data.push(action.payload);
    },

    myQuestions(state, action) {
      state.allMyQuestions = action.payload;
    },

    removeQuestion(state, action) {
      const updated = state.data.filter((ques) => {
        return ques._id !== action.payload;
      });
      state.data = updated;
    },

    removeFrommyQuestion(state, action) {
      const updated = state.allMyQuestions.filter((ques) => {
        return ques._id !== action.payload;
      });
      state.allMyQuestions = updated;
    },

    getSingleQuestion(state, action) {
      state.singleQuestion = action.payload;
    },

    addAnswer(state, action) {
      state.answer = action.payload;
    },

    storeSingleAnswer(state, action) {
      state.questionAsnwers.push(action.payload);
    },

    storeAllAnswers(state, action) {
      const dataIndex = state.questionAsnwers.findIndex(
        (ans) => ans._id === action.payload._id
      );

      if (dataIndex !== -1) {
        state.questionAsnwers[dataIndex] = action.payload;
      } else {
        state.questionAsnwers = action.payload;
      }
    },

    removeAnswer(state, action) {
      const updated = state.questionAsnwers.filter((ans) => {
        return ans._id !== action.payload;
      });

      state.questionAsnwers = updated;
    },

    storeEditAnswerId(state, action) {
      state.editAnswerId = action.payload;
    },

    removeDepedencies(state, action) {
      state.title = "";
      state.description = "";
      state.answer = "";
      state.data = [];
      state.questionAsnwers = [];
      state.singleQuestion = null;
      state.editAnswerId = "";
    },
  },
});

export const {
  storeQuestion,
  myQuestions,
  addTitle,
  addDescription,
  singleQuestion,
  removeQuestion,
  removeDepedencies,
  getSingleQuestion,
  addAnswer,
  storeSingleAnswer,
  storeAllAnswers,
  removeAnswer,
  storeEditAnswerId,
  removeFrommyQuestion,
} = questionSlice.actions;
export const questionReducer = questionSlice.reducer;
