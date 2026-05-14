import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("token");

  // No token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {

    const decoded = jwtDecode(token);

    // Expired token
    if (decoded.exp * 1000 < Date.now()) {

      localStorage.removeItem("token");

      return <Navigate to="/" replace />;
    }

  } catch (err) {

    // Invalid token
    localStorage.removeItem("token");

    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;