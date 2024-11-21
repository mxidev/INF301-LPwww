import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Navibar from "./navibar";
import Footer from "./FooterPage"

import Page1 from "./Page1";
import Carro from "./Carro";

function App() {
  return (
    <BrowserRouter>
      <Navibar></Navibar>
      <Routes>
        <Route path="/" element={<Login></Login>} />
        <Route exact path="/p1" element={<Page1></Page1>} />
        <Route path="/Carro" element={<Carro />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
};

export default App