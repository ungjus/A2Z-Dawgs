import React from 'react';

interface LoginProps {
  isMobile?: boolean; // Prop to determine if it's a mobile view
  active?: boolean;
}

const Login = ({ isMobile = false, active = false}: LoginProps) => {
  const buttonStyle = isMobile
    ? `lg:hidden lg:w-full w-full justify-center p-2 bg-blue-400 rounded text-black hover:bg-blue-300 ${active ? 'block' : 'hidden'}`
    : `lg:inline-flex hidden ml-4 py-2 px-4 bg-blue-400 rounded text-black hover:bg-blue-300 ${active ? 'hidden' : ''}`;

  return (
    <button className={buttonStyle} onClick={() => console.log("clicked")}>
      Login
    </button>
  );
};

export default Login;
