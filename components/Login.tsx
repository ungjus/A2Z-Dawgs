import React from 'react';
import { useUser } from "@auth0/nextjs-auth0/client"
import Link from 'next/link';


interface LoginProps {
  isMobile?: boolean; // Prop to determine if it's a mobile view
  active?: boolean;
}

const Login = ({ isMobile = false, active = false}: LoginProps) => {

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>{error.message}</div>

  const buttonStyle = isMobile
    ? `lg:hidden lg:w-full w-full justify-center p-2 bg-blue-600 rounded text-white hover:bg-blue-500 border-t-[1px] ${active ? 'block' : 'hidden'}`
    : `lg:inline-flex hidden ml-4 py-2 px-4 bg-blue-600 rounded text-white hover:bg-blue-500 ${active ? 'hidden' : ''}`;

  const loggedInStyle = isMobile
    ? `lg:hidden lg:inline-flex lg:w-min w-min flex justify-center p-2 text-black items-center m-auto border-t-[1px] ${active ? 'block' : 'hidden'}`
    : `lg:inline-flex hidden ml-4 py-2 px-4 text-black items-center ${active ? 'hidden' : ''}`;

  if (user) {
    return (
      <div className={loggedInStyle}>
        <Link href="/profile">
          <div className="inline-flex items-center p-2 mr-4">
            {user.picture ?
                <img src={user.picture} className="h-10 rounded-full" />: 
                <img src="https://static.vecteezy.com/system/resources/thumbnails/002/082/093/small/cute-shiba-inu-dog-paws-up-over-wall-illustration-vector.jpg" className="h-10 rounded-full" />

            }
            <p className="text-nowrap pl-2">{user.name}</p>
          </div>
          
        </Link>
        
        
        <button className="py-2 px-4 bg-blue-600 rounded text-white hover:bg-blue-500 ml-8 transition hover:-translate-y-1 hover:scale-110 ease-in-out duration-300">
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
