import React from "react";

const Button = ({ onClick, className, children, ...props }) => {
    return (
        <button className={`${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
