import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '@/context/context';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { IsSelectWomens, SetIsSelectWomens, SetIsSidebarOpen, user } = useContext(AppContext);
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();



    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const isHomeOrMensOrWomens = ["/", "/mens", "/womens"].includes(location.pathname);

    // Define collection categories based on gender selection
    const collections = [
        { title: "Pants Collection", route: 'pants', description: "Explore our latest collection of stylish pants." },
        { title: "Shirt Collection", route: 'shirt', description: "Find premium quality shirts for every occasion." },
        { title: "Sweater Collection", route: 'sweater', description: "Stay cozy and stylish with our sweater collection." },
        { title: "Shoes Collection", route: 'shoes', description: "Find the perfect pair of shoes for every occasion." },
    ];

    const handleCollection = (name: string) => {
        navigate(`/${IsSelectWomens ? 'women' : 'men'}/Collection/${name}`);
    };

    return (
        <>
            {/* Navbar Container */}
            <div className="flex flex-col">
                {/* Main Navbar */}
                <div className="sm:h-[10vh] h-[8vh] fixed top-0 left-0 w-full bg-white border-b border-gray-300 z-40">
                    <div className="flex justify-between items-center w-full h-full px-6">
                        {/* Mobile Menu Icon */}
                        <div className="text-lg sm:hidden block cursor-pointer" onClick={() => SetIsSidebarOpen(true)}>
                            <i className="fa-solid fa-bars hover:text-gray-600 transition-all"></i>
                        </div>

                        {/* Brand Name */}
                        <div className="sm:block hidden">
                            <h1 className="uppercase garamond font-bold text-2xl tracking-wider text-gray-900">
                                SuitSphere
                            </h1>
                        </div>

                        {/* Icons Section */}
                        <div className="flex items-center gap-6 text-lg">
                            <i className="fa-solid fa-magnifying-glass hover:text-gray-600 transition-all cursor-pointer active:text-slate-950"></i>

                            {/* User Icon Dropdown */}
                            <div className="relative sm:block hidden" ref={dropdownRef}>
                                <button onClick={toggleDropdown} className="hover:text-gray-800 transition-all">
                                    <i className="fa-regular fa-user text-xl p-2 hover:text-gray-600 active:bg-slate-200"></i>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute py-2 px-4 flex flex-col gap-3 text-sm right-0 mt-2 bg-white border rounded-md shadow-lg w-52 z-[600]">
                                        <span className='font-semibold'>Welcome</span>
                                        <div className="flex flex-col gap-2">
                                            {user ? (
                                                <>
                                                    <NavLink to="/profile" className="text-gray-800 hover:font-semibold">Profile</NavLink>
                                                    <NavLink to="/signup" className="text-gray-800 hover:font-semibold">Logout</NavLink>
                                                </>
                                            ) : (
                                                <>
                                                    <NavLink to="/login" className="text-gray-800 hover:font-semibold">Login</NavLink>
                                                    <NavLink to="/signup" className="text-gray-800 hover:font-semibold">SignUp</NavLink>
                                                </>
                                            )}

                                        </div>
                                    </div>
                                )}
                            </div>

                            {user ? (<i className="fa-solid fa-cart-shopping hover:text-gray-600 transition-all cursor-pointer active:bg-slate-200"></i>) : null}


                        </div>
                    </div>
                </div>

                {/* Small Navbar */}
                <div className={`sm:h-[8vh] h-[6vh] bg-white shadow-sm fixed top-[8vh] sm:top-[10vh] left-0 w-full sm:flex hidden items-center justify-center gap-5 px-6 z-20`}>
                    {/* Show Home NavLink if not on "/", "/mens", or "/womens" */}
                    {!isHomeOrMensOrWomens && (
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-gray-600 py-2 px-4 rounded-md">Collection</NavigationMenuTrigger>
                                    <NavigationMenuContent className="absolute left-0 min-w-[350px] bg-white shadow-lg rounded-lg p-4 border border-gray-200 z-50">
                                        <div className="grid grid-cols-2 gap-4">
                                            {collections.map((item) => (
                                                <div
                                                    key={item.title}
                                                    onClick={() => handleCollection(item.route)}
                                                    className="p-4 bg-slate-50 rounded-md hover:bg-gray-100 transition-all cursor-pointer"
                                                >
                                                    <div className="text-sm font-medium">{item.title}</div>
                                                    <p className="text-xs text-gray-600">{item.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    )}

                    {!isHomeOrMensOrWomens && (
                        <NavLink to="/" className="text-gray-700 border-s ps-6 border-gray-200 hover:text-black transition-all">
                            Home
                        </NavLink>
                    )}
                    {isHomeOrMensOrWomens && (
                        <ul className="flex gap-6 text-gray-700 sm:text-sm text-xs font-medium">
                            <li className="cursor-pointer hover:text-black transition-all border-r border-gray-400 pr-6">
                                <NavLink to="/mens" onClick={() => SetIsSelectWomens(false)}>Mens</NavLink>
                            </li>
                            <li className="cursor-pointer hover:text-black transition-all">
                                <NavLink to="/womens" onClick={() => SetIsSelectWomens(true)}>Womens</NavLink>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
