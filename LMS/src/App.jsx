import { Routes, Route } from "react-router-dom";
import './App.css';

//components
import SignupForm from './components/auth/SignupForm';
import Login from './pages/auth/Auth'

import Mystate from './context/myState';
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Mystate>
        <Routes>

          <Route path="/:name" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />

        </Routes>

        <Toaster />
      </Mystate>
    </>
  );
};

export default App;

