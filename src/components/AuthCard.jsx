import { motion } from "framer-motion";

const AuthCard = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-purple-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-3xl shadow-2xl w-92.5"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AuthCard;