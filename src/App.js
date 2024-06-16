import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import FormInt from "./pages/FormInt";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/form" element={<FormInt />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
