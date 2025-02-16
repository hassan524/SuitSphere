import { useState, useEffect } from 'react';
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
    const { IsSelectWomens, SetIsSelectWomens, SetIsSidebarOpen, user, Carts, SetIsLogOutOpen } = useContext(AppContext);
    const location = useLocation();
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const isHomeOrMensOrWomens = ["/", "/mens", "/womens"].includes(location.pathname);

    const collections = [
        { title: "Pants Collection", route: 'pants', description: "Explore our latest collection of stylish pants." },
        { title: "Shirt Collection", route: 'shirt', description: "Find premium quality shirts for every occasion." },
        { title: "Sweater Collection", route: 'sweater', description: "Stay cozy and stylish with our sweater collection." },
        { title: "Shoes Collection", route: 'shoes', description: "Find the perfect pair of shoes for every occasion." },
    ];

    const handleCollection = (name) => {
        navigate(`/${IsSelectWomens ? 'women' : 'men'}/Collection/${name}`);
    };

    const handleCart = () => {
        navigate('/cart');
    };

    // Close search bar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.search-bar') && !event.target.closest('.search-icon')) {
                setIsSearchBarOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Handle form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        if (searchValue.trim()) {
          navigate(`/search?query=${encodeURIComponent(searchValue.trim())}`);
          setIsSearchBarOpen(false); // Optional: close search bar after submission
        }
      };

    return (
        <>
            {/* Main Navbar */}
            <div className="sm:h-[10vh] h-[8vh] fixed top-0 left-0 w-full bg-white border-b border-gray-300 z-40">
                <div className="flex justify-between gap-5 items-center w-full h-full px-4">
                    {/* Mobile Menu Icon */}
                    {!isSearchBarOpen ? (
                        <div className="text-lg sm:hidden block cursor-pointer" onClick={() => SetIsSidebarOpen(true)}>
                            <i className="fa-solid fa-bars hover:text-gray-600 transition-all"></i>
                        </div>
                    ) : null}

                    {/* Brand Name */}
                    <div className="sm:block hidden">
                        <h1 className="uppercase garamond font-bold text-2xl tracking-wider text-gray-900">
                            SuitSphere
                        </h1>
                    </div>

                    {/* Search Bar */}
                    <div className={`flex items-center gap-2 justify-between w-full transition-all ${isSearchBarOpen ? "opacity-100" : "opacity-0 hidden"}`}>
                        <form onSubmit={handleSearchSubmit} className="flex-1 relative search-bar">
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="w-full sm:p-3 p-2 pe-12 pr-16 sm:text-md text-sm tracking-wide border border-gray-200 rounded-full outline-none"
                                placeholder="Search for items..."
                            />
                            <button type="submit" className="absolute px-2 right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </form>
                    </div>

                    {/* Icons Section */}
                    <div className={`flex items-center gap-4 text-lg ${isSearchBarOpen ? 'sm:flex hidden' : 'flex'}`}>

                        <i
                            className={`fa-solid ${isSearchBarOpen ? 'hidden' : 'flex'} fa-magnifying-glass hover:text-gray-600 transition-all cursor-pointer search-icon`}
                            onClick={() => setIsSearchBarOpen(true)}
                        ></i>

                        <div className="relative sm:block hidden">
                            <i className="fa-regular fa-user text-xl p-2 hover:text-gray-600 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}></i>

                            {isDropdownOpen && (
                                <div className="absolute py-2 px-4 flex flex-col gap-3 text-sm right-0 mt-2 bg-white border rounded-md shadow-lg w-52 z-[600]">
                                    <span className='font-semibold'>Welcome</span>
                                    <div className="flex flex-col gap-2">
                                        {user ? (
                                            <>
                                                <NavLink to="/profile" className="text-gray-800 hover:font-semibold">Profile</NavLink>
                                                <NavLink to="/signup" className="text-gray-800 hover:font-semibold" onClick={() => SetIsLogOutOpen(true)}>Logout</NavLink>
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

                        {user && (
                            <div className="relative cursor-pointer" onClick={handleCart}>
                                <i className="fa-solid fa-cart-shopping hover:text-gray-600 transition-all"></i>
                                {Carts?.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-gray-700 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                                        {Carts.length}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/* Secondary Navbar */}
            <div className={`sm:h-[8vh] h-[6vh] bg-white fixed top-[8vh] sm:top-[10vh] left-0 w-full sm:flex hidden items-center justify-center gap-5 px-6 z-20`}>
                {!isHomeOrMensOrWomens && (
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100">
                                    Collection
                                </NavigationMenuTrigger>
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
                    <>
                        <NavLink to="/" className="text-gray-700 border-s ps-6 border-gray-200 hover:text-black transition-all">
                            Home
                        </NavLink>

                        <NavLink to="/orders" className="text-gray-700 border-s ps-6 border-gray-200 hover:text-black transition-all">
                            Orders
                        </NavLink>
                    </>
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
        </>
    );
};

export default Navbar;

