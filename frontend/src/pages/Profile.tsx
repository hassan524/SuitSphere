import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import AppContext from '@/context/context';

const Profile = () => {
    const [, setName] = useState('');
    const [, setEmail] = useState('');
    const [password, setPassword] = useState('********');

    const { user } = useContext(AppContext);

    return (
        <div className="flex  flex-col gap-[2rem] justify-center py-16 px-5">
            <div className="">
                <h2 className="text-3xl md:text-4xl text-center text-gray-800 uppercase mb-6">
                    Account Settings
                </h2>
                <p className="text-center text-gray-500 mb-12">
                    Update your personal information and connect with us on social media.
                </p>
            </div>

            <div className="sm:max-w-4xl w-full mx-auto rounded-2xl">

                <form className="flex w-full flex-col sm:gap-10 gap-14">
                    <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-10 gap-14">
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={user.username}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none "
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="email"
                                value={user.email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none "
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none "
                            placeholder="Enter your password"
                        />
                    </div>

                    <Button className="w-44 self-center">
                        Save Changes
                    </Button>
                </form>
            </div>

            <div className="max-w-4xl mx-auto mt-12">
                <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    Follow Us on Social Media
                </h3>
                <div className="flex justify-center items-center gap-8">
                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-12 w-12 bg-gray-800 text-white rounded-full shadow-md hover:scale-110 transition"
                        aria-label="GitHub"
                    >
                        <i className="fa-brands fa-github text-xl"></i>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-12 w-12 bg-blue-700 text-white rounded-full shadow-md hover:scale-110 transition"
                        aria-label="LinkedIn"
                    >
                        <i className="fa-brands fa-linkedin text-xl"></i>
                    </a>
                    <a
                        href="https://www.instagram.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-12 w-12 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-md hover:scale-110 transition"
                        aria-label="Instagram"
                    >
                        <i className="fa-brands fa-instagram text-xl"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Profile;
