const PasswordStrength = ({ password }) => {
  const getStrength = () => {
    let strength = 0;

    if (password.length >= 6) strength++;
    if(password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
  };

  const strength = getStrength();

  const strengthLabels = [
  "Very Weak",
  "Weak",
  "Medium",
  "Strong",
  "Very Strong",
  "Unbreakable"
];

  return (

<div className="mt-3">
  <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
    <div
      className={`h-3 transition-all duration-500`}
      style={{
        width: `${(strength / 5) * 100}%`,
        background:
          strength <= 1
            ? "red"
            : strength === 2
            ? "orange"
            : strength === 3
            ? "yellow"
            : strength === 4
            ? "green"
            : "limegreen",
      }}
    ></div>
  </div>

  <p className="text-sm mt-1 font-semibold">
    {strengthLabels[strength]}
  </p>
</div>
  );
};

export default PasswordStrength;