import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Lazy Loaded Components
const SignUp = lazy(() => import("./components/auth/SignupForm"));
const Login = lazy(() => import("./pages/auth/Auth"));
const Home = lazy(() => import("./pages/home/Home"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Student = lazy(() => import("./pages/student/Student"));
const Teacher = lazy(() => import("./pages/teacher/Teacher"));

import Mystate from "./context/myState";
import { Toaster } from "react-hot-toast";

import Layout from "./js/Layout";

import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import { ProtectedRouteForTeacher } from "./protectedRoute/ProtectedRouteForTeacher";
import { ProtectedRouteForStudent } from "./protectedRoute/ProtectedRouteForStudent";

const App = () => {
  return (
    <Mystate>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/:name" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} >
              <Route
                path="/home/dashboard"
                element={
                  <ProtectedRouteForAdmin>
                    <Dashboard />
                  </ProtectedRouteForAdmin>
                }
              />
              <Route
                path="/home/student"
                element={
                  <ProtectedRouteForStudent>
                    <Student />
                  </ProtectedRouteForStudent>
                }
              />
              <Route
                path="/home/teacher"
                element={
                  <ProtectedRouteForTeacher>
                    <Teacher />
                  </ProtectedRouteForTeacher>
                }
              />
            </Route>
          </Route>

          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toaster />
      </Suspense>
    </Mystate>
  );
};

export default App;
