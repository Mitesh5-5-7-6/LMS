import React from 'react'
import { Navigate } from "react-router-dom";

export const ProtectedRouteForStudent = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("users"));

    if (user?.role === 'Student' || user?.role === 'Teacher' || user?.role === 'Admin') {
        return children;
    }
    else {
        return <Navigate to="/login" />;
    }
}