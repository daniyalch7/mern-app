import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Hero from "./components/Hero";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import CreateQuestion from "./components/CreateQuestion";
import AllQuestion from "./components/AllQuestion";
import SingleQuestion from "./components/SingleQuestion";
import EditQuestion from "./components/EditQuestion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route path="createquestion" element={<CreateQuestion />} />
          <Route path="allquestion" element={<AllQuestion />} />
          <Route path="singlequestion/:id" element={<SingleQuestion />} />
          <Route path="editquestion/:id" element={<EditQuestion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
