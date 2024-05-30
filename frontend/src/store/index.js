import { configureStore } from "@reduxjs/toolkit";
import {
  loginReducer,
  userEmail,
  userPassword,
  addLoginData,
} from "./slices/loginSlice";
import {
  registerReducer,
  registerName,
  registerPassword,
  registerEmail,
  registerConfirmPassword,
} from "./slices/registerSlice";

import { authReducer, storeUserData } from "./slices/authSlice";
import {
  questionReducer,
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
} from "./slices/questionSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    auth: authReducer,
    question: questionReducer,
  },
});

export {
  store,
  registerName,
  registerEmail,
  registerPassword,
  registerConfirmPassword,
  userEmail,
  userPassword,
  storeUserData,
  addLoginData,
  storeQuestion,
  addTitle,
  addDescription,
  myQuestions,
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
};
