import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TopicList from "./pages/topics/TopicList";
import Login from "./pages/security/Login";
import Layout from "./Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import TopicDetails from "./pages/topics/TopicDetails";
import { AuthProvider, AuthContext } from "./context/AuthContext";

function App() {
  
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/login"
              element={<Login  />}
            />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/topics"
              element={
                <Layout>
                  <TopicList />
                </Layout>
              }
            />
            <Route
              path="/topics/:topicId"
              element={
                <Layout>
                  <TopicDetails />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
