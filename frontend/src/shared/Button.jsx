import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  disabled,
  fullWidth,
  className = ""
}) => {
  const classes = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? "btn-full" : "",
    className
  ].join(" ");

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
