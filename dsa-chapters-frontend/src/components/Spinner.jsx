import React from "react";

const Spinner = ({message}) => {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-136px)]">
      <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
      <p>{message}</p>
    </div>
    
    </>
    
  );
};

export default Spinner;
