import { useContext, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import AppContext from "@/context/context";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Sidebar = () => {
    const { IsSideBarOpen, SetIsSidebarOpen, IsSelectWomens, SetIsSelectWomens, user, SetIsLogOutOpen } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        SetIsSidebarOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = IsSideBarOpen ? "hidden" : "auto";
    }, [IsSideBarOpen]);

    const collection = ['shirt', 'sweater', 'pants', 'shoes'];

    const handleCollection = (name: string) => {
        navigate(`/${IsSelectWomens ? 'women' : 'men'}/Collection/${name}`);
    };

    return (
        <>
            {IsSideBarOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
                    onClick={() => SetIsSidebarOpen(false)}
                ></div>
            )}
            <div className={`h-screen flex-col flex gap-5 xs:w-[55vw] w-[70vw] sm:hidden fixed top-0 left-0 bg-white shadow-md z-50 transition-all duration-300 ${IsSideBarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex">
                    <button
                        className={`w-1/2 py-2 text-lg ${IsSelectWomens ? "bg-slate-100" : "text-gray-500"}`}
                        onClick={() => SetIsSelectWomens(true)}
                    >
                        Women
                    </button>
                    <button
                        className={`w-1/2 py-2 text-lg ${!IsSelectWomens ? "bg-slate-100" : "text-gray-500"}`}
                        onClick={() => SetIsSelectWomens(false)}
                    >
                        Men
                    </button>
                </div>
                <div className="w-full h-full flex flex-col gap-5 py-4 px-5">
                    {/* <div className="text-center">
                        <h2 className="text-[2rem] text-gray-400 font-semibold uppercase tracking-wide">SuitsSphere</h2>
                    </div> */}
                    <div className="flex flex-col gap-5">
                        <NavLink to="/" className="no-underline">
                            <div className="flex items-center gap-3 text-lg hover:underline cursor-pointer">
                                <span>Home</span>
                            </div>
                        </NavLink>
                        <hr />
                        <NavLink to="/orders" className="no-underline">
                            <div className="flex items-center gap-3 text-lg hover:underline cursor-pointer">
                                <span>Orders</span>
                            </div>
                        </NavLink>
                        <hr />
                        <Accordion className="flex flex-col gap-5" type="single" collapsible>
                            <AccordionItem value="collection">
                                <AccordionTrigger className="text-lg flex items-center hover:underline">
                                    <span>Collection</span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col gap-4 mt-2 ml-4">
                                        {collection.map((item) => (
                                            <div key={item} onClick={() => handleCollection(item)}>
                                                <span className="text-xl hover:underline capitalize cursor-pointer">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="accounts">
                                <AccordionTrigger className="text-lg flex items-center hover:underline">
                                    <span>Accounts</span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col gap-5 mt-2 ml-4">
                                        {user ? (
                                            <>
                                                <NavLink to="/profile" className="text-gray-800 hover:font-semibold">Profile</NavLink>
                                                <span className="text-gray-800 hover:font-semibold cursor-pointer" onClick={() => SetIsLogOutOpen(true)}>Logout</span>
                                            </>
                                        ) : (
                                            <>
                                                <NavLink to="/login" className="text-gray-800 hover:font-semibold">Login</NavLink>
                                                <NavLink to="/signup" className="text-gray-800 hover:font-semibold">SignUp</NavLink>
                                            </>
                                        )}

                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
