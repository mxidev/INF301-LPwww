import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navibar from "./Navibar";
import Footer from "./FooterPage";
import Login from './views/login';
import Register from './views/register';
import Page1 from "./Page1";
import Carro from "./Carro";

function App() {
  const hideNavRoutes = ["/", "/register"];
  const location = useLocation();

  return (
    <>
      {!hideNavRoutes.includes(location.pathname) && <Navibar />}
      <Routes>
        <Route path="/" element={<Login></Login>} />
        <Route path="/register" element={<Register></Register>} />
        <Route exact path="/p1" element={<Page1></Page1>} />
        <Route path="/Carro" element={<Carro />} />
      </Routes>
      {!hideNavRoutes.includes(location.pathname) && <Footer />}
    </>
  )
};

function Main() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default Main