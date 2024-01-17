import Link from 'next/link';
import { useState } from 'react';
import Login from './Login'

const navLinks = [
    { href: '/', title: 'Home' },
    { href: '/explore', title: 'Explore' },
    { href: '/map', title: 'Food Map'},
    { href: '/rules', title: 'A-Z Rules'},
    { href: '/about', title: 'About Us' },
]


const Navbar = (): JSX.Element => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    return (
        <nav className='flex items-center flex-wrap bg-gray-800 p-3 border-b-[1px] shadow-sm'>

            {/* Left Side: Logo and Blog Name */}
            <Link href='/'>
                <div className='inline-flex items-center p-2 mr-4 '>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/082/093/small/cute-shiba-inu-dog-paws-up-over-wall-illustration-vector.jpg" className="h-10" />

                    <span className='text-xl text-white font-bold uppercase tracking-wide pl-1'>
                        A-Z Dawgs
                    </span>
                </div>
            </Link>

             {/* Right Side: Hamburger/Cross Menu Button */}
             <button
                className='inline-flex p-3 hover:scale-110 ease-in-out duration-300 rounded lg:hidden text-white ml-auto outline-none'
                onClick={handleClick}
            >
                {active ? (
                    // Cross icon for active state
                    <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M6 18L18 6M6 6l12 12'
                        />
                    </svg>
                ) : (
                    // Hamburger icon for inactive state
                    <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 6h16M4 12h16M4 18h16'
                        />
                    </svg>
                )}
            </button>

            {/* Nav Links and Log in Button*/}
            <div
                className={`w-full lg:inline-flex lg:flex-grow lg:w-auto ${active ? '' : 'hidden'} `}
            >
                <div className="lg:inline-flex lg:flex-row lg:w-full w-full lg:items-center items-start  flex flex-col lg:h-auto">
                    {/* Center: Navigation Links */}
                    <ul className={`lg:inline-flex lg:w-full w-full justify-center`}>
                        {navLinks
                            .filter((link) => link.href !== '/')
                            .map((link) => (
                                <Link key={link.title} href={link.href}>
                                    <li className="lg:inline-flex px-3 py-2 rounded text-white items-center flex justify-center cursor-pointer " onClick={() => handleClick()}>{link.title}</li>
                                </Link>
                            ))}
                    </ul>

                    {/* Right Side: Login Button (Hidden on Mobile, Shown on Larger Devices) */}
                    <Login isMobile={false} active={active}/>

                </div>
            </div>

            {/* Mobile: Login Button (Visible on Mobile Inside Hamburger Menu) */}
            <Login isMobile={true} active={active}/>

        </nav>
    );
};

export default Navbar;