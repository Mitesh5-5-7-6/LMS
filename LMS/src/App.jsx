import { Routes, Route } from "react-router-dom";
import './App.css';

//components
import SignUp from './components/auth/SignupForm';
import Login from './pages/auth/Auth'
import Home from './pages/home/Home'
import Dashboard from "./pages/dashboard/Dashboard";
import Student from "./pages/student/Student";
import Teacher from "./pages/teacher/Teacher";

import Mystate from './context/myState';
import { Toaster } from "react-hot-toast";

import Layout from './js/Layout';

const App = () => {
  return (
    <>
      <Mystate>
        <Routes>

          <Route path="/" element={<Layout />}>

            <Route path="/:name" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Login />} />

            <Route path="/" element={<Home />} >

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/student" element={<Student />} />
              <Route path="/teacher" element={<Teacher />} />

            </Route>
          </Route>
        </Routes>

        <Toaster />
      </Mystate>
    </>
  );
};

export default App;

