import { Navigate } from "react-router-dom";

export const ProtectedRouteForTeacher = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("users"));

    if (user?.role === 'Teacher' || user?.role === 'Admin') {
        return children;
    }
    else {
        return <Navigate to="/login" />;
    }
}