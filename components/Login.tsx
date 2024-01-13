import React from 'react';
import { useUser } from "@auth0/nextjs-auth0/client"


interface LoginProps {
  isMobile?: boolean; // Prop to determine if it's a mobile view
  active?: boolean;
}

const Login = ({ isMobile = false, active = false}: LoginProps) => {

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>{error.message}</div>

  const buttonStyle = isMobile
    ? `lg:hidden lg:w-full w-full justify-center p-2 bg-blue-600 rounded text-white hover:bg-blue-500 transition hover:-translate-y-1 hover:scale-110 ease-in-out duration-300 ${active ? 'block' : 'hidden'}`
    : `lg:inline-flex hidden ml-4 py-2 px-4 bg-blue-600 rounded text-white hover:bg-blue-500 hover:-translate-y-1 hover:scale-110 transition ease-in-out duration-300 ${active ? 'hidden' : ''}`;

  const loggedInStyle = isMobile
    ? `lg:hidden sm:inline-flex lg:w-full w-full justify-center p-2 text-black items-center flex hover:-translate-y-1 hover:scale-110 transition ease-in-out duration-300 ${active ? 'block' : 'hidden'}`
    : `lg:inline-flex hidden ml-4 py-2 px-4 text-black items-center transition hover:-translate-y-1 hover:scale-110 ease-in-out duration-300 ${active ? 'hidden' : ''}`;

  if (user) {
    return (
      <div className={loggedInStyle}>
        <p className="text-nowrap ">Welcome {user.name}</p>
        
        <button className="py-2 px-4 bg-blue-600 rounded text-white hover:bg-blue-500 ml-8">
          <a href="/api/auth/logout">Logout</a>
        </button>

      </div>
    );
  }

  return (
    <button className={buttonStyle} onClick={() => console.log("clicked")}>
      <a href="/api/auth/login">Login</a>
    </button>
  );
};

export default Login;
