import { toast,ToastContainer } from "react-toastify";

const PasswordGenerator = ({ setPassword }) => {
 const generateStrongPassword = () => {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+{}[]";

  const all = upper + lower + numbers + symbols;

  let password = "";

  // 🔥 FORCE REQUIRED CHARACTERS
  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // 🔥 FILL REST (min length 12 for real strength)
  for (let i = password.length; i < 14; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  // 🔥 SHUFFLE (IMPORTANT so pattern is not predictable)
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
};

  const handleGenerate = () => {
  const newPass = generateStrongPassword();
  setPassword(newPass);
  toast.success("Strong password generated and set");
};

  return (
    <button
      onClick={handleGenerate}

      className="mt-2 text-blue-500 text-sm"
    >
      Generate Strong Password 
    </button>
  );
};

export default PasswordGenerator;