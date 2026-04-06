import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/DashBoard";

import About from "./components/About";
import { Layout } from "./components/Layout";
import Wallet from "./pages/Wallet";
import LandingPage from "./pages/LandingPage";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/wallet"
        element={
          <Layout>
            <Wallet />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
