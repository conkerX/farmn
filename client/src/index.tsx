import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./Components/App";
import { UserProvider } from "./Context/UserContext";
import { JwtProvider } from "./Context/JwtContext";
import { FarmProvider } from "./Context/FarmContext";
import "./Styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <JwtProvider>
          <FarmProvider>
            <App />
          </FarmProvider>
        </JwtProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
