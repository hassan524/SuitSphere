import  { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import AppContext from '@/context/context';

const Profile = () => {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [password, setPassword] = useState('********');

    const {user} = useContext(AppContext)
    console.log(user)

    const handleSave = () => {
        // Handle saving or updating account info here
        console.log('Account info saved!');
    };

    return (
        <div className="flex sm:px-8 px-6 mt-[5rem]">
            {/* Sidebar */}
            <div className="w-1/4 md:flex flex-col gap-4 hidden h-full px-4">
                <span className="font-semibold text-xl">Account</span>
                <NavLink to="/logout" className="text-gray-800 text-lg hover:text-gray-950">Logout</NavLink>
            </div>

            {/* Main Content */}
            <div className="w-full flex flex-col sm:gap-10 gap-8 sm:px-8 md:border-s md:border-slate-200">
                {/* Account Information */}
                <div className="flex items-center justify-start">
                    <h2 className="md:text-[4rem] garamond text-[4rem] font-semibold">Account</h2>
                </div>

                <hr />

                {/* Form to Edit Account */}
                <div className="w-full flex flex-col gap-10">
                    <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start">
                        <h2 className="font-semibold text-xl">Contact Information</h2>
                        <Button className='py-6 sm:flex hidden'>SAVE CHANGES</Button>
                    </div>
                    <form className="flex flex-col gap-8">
                        {/* Name and Email Inputs Side by Side */}
                        <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-4 gap-8">
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-2 py-4 border-none bg-gray-100 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 py-4 border-none bg-gray-100 rounded-md"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 py-4 border-none bg-gray-100 rounded-md"
                            />
                        </div>

                        <Button className='sm:hidden flex'>SAVE CHANGES</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
