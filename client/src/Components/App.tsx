import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { Header } from "./Header/Header";
import { Home } from "./Home";
import { Livestock } from "./Livestock/Livestock";
import { Farmers } from "./Farmers/Farmers";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/livestock" element={<Livestock />} />
        <Route path="/farmers" element={<Farmers />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
