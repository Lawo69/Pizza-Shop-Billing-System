import React from "react";

const Button = ({ type = "button", children, variant = "primary", onClick, className = "" }) => {
  const baseStyles = "px-4 py-3 rounded-md text-sm font-semibold cursor-pointer transition duration-200";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "border text-black hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
