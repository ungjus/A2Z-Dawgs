import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
    { href: '/', title: 'Home' },
    { href: '/blog', title: 'Blog' },
    { href: '/tags', title: 'Tags' },
    { href: '/projects', title: 'Projects' },
    { href: '/about', title: 'About' },
]


const Navbar = (): JSX.Element => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    return (
            <nav className='flex items-center flex-wrap bg-white p-3 '>

                {/* Left Side: Logo and Blog Name */}
                <Link href='/'>
                    <a className='inline-flex items-center p-2 mr-4 '>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/002/082/093/small/cute-shiba-inu-dog-paws-up-over-wall-illustration-vector.jpg" className="h-8" />

                        <span className='text-xl text-black font-bold uppercase tracking-wide pl-1'>
                            A-Z Dawgs
                        </span>
                    </a>
                </Link>

                {/* Right Side: Hamburger Menu Button */}
                <button
                    className=' inline-flex p-3 hover:bg-gray-200 rounded lg:hidden text-black ml-auto outline-none'
                    onClick={handleClick}
                >
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
                </button>

                {/* Right Side: Show button and links */}
                <div
                    className={`${active ? '' : 'hidden'
                        }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
                >
                    <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
                        <ul>
                            {navLinks
                                .filter((link) => link.href !== '/')
                                .map((link) => (
                                    <Link
                                        key={link.title}
                                        href={link.href}
                                    >
                                        <li className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black items-center justify-center cursor-pointer" onClick={() => handleClick()}>{link.title}</li>
                                    </Link>
                                ))}
                        </ul>
                    </div>
                </div>
            </nav>
    );
};

export default Navbar;