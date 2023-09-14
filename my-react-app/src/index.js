
/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

*/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import HeaderBar from "./views/AppNavBar"; 
import PortfolioPageAdd from "./views/PortfolioPageAdd";
import Portfolio from "./views/Portfolio";
import PortfolioPageUpdate from "./views/PortfolioPageUpdate";
import LoginPage from "./views/SignIn";
import CoursesPage from "./views/Courses";
import SignUp from "./views/SignUp";
import NoPage from "./views/NoPage";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { AuthProvider } from "./utils/useAuth";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <BrowserRouter>
        <AuthProvider>
      <Routes>
       
          <Route path="/" element={<Home />} />
          <Route path="portfolios" element={<ProtectedRoute > <Portfolio /> </ProtectedRoute>} />
          <Route path="put/portfolios/:id" element={<PortfolioPageUpdate />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="add/portfolios" element={<PortfolioPageAdd />} />
          <Route path="*" element={<NoPage />} />

      </Routes>
      </AuthProvider>
    </BrowserRouter >
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

