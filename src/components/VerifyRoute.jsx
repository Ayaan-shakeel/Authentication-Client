import { Navigate } from "react-router-dom";

const VerifyRoute = ({ children }) => {

  const verifyEmail = localStorage.getItem("verifyEmail");

  if (!verifyEmail) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default VerifyRoute;