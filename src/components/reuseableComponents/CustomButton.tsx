import React from "react";

interface CustomButtonProps {
  width?: string;
  height?: string;
  bgColor?: string;
  textColor?: string;
  radius?: string;
  text: string;
  onClick?: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  width = "auto", // Default to "auto" if no width is provided
  height = "auto",
  bgColor = "#000000",
  textColor = "#FFFFFF",
  radius = "4px",
  text,
}) => {
  return (
    <button
      style={{
        width: width,
        height: height,
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: radius,
      }}
      className={`focus:ring-offset-2 hover:opacity-90`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
