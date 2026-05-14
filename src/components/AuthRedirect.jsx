import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthRedirect = ({ children }) => {

  const token = localStorage.getItem("token");

  if (!token) return children;

  try {

    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 > Date.now()) {
      return <Navigate to="/dashboard" replace />;
    }

    localStorage.removeItem("token");

  } catch (err) {

    localStorage.removeItem("token");
  }

  return children;
};

export default AuthRedirect;