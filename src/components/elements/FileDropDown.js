import React from "react";
import { BsImage } from "react-icons/bs";

export const FileDropDown = () => {
  return (
    <div className="flex items-center justify-center bg-blue-200 rounded-3xl px-20 py-10 w-[503px] shadow-xl mt-6">
      <BsImage className="mr-4" size={40} />
      Drop images here or click to browse
    </div>
  );
};
