import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Appbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin'); // navigate to login page after logout
    };

    return (
        <div className="shadow h-14 flex justify-between items-center px-10 z-50">
            <div className="text-zinc-700 font-semibold text-xl ml-4">
                Payment App
            </div>
            <div className="flex items-center relative">
                <div className="mr-4">
                    Hello
                </div>
                <div
                    className="rounded-full h-12 w-12 bg-blue-200 border-2 border-zinc-400 flex justify-center items-center cursor-pointer"
                    onClick={handleProfileClick}
                >
                    <div className="text-xl ">
                        P 
                    </div>
                </div>
                {dropdownOpen && (
                    <div className="absolute right-0   top-1 mt-14 bg-blue-600 text-white rounded-md shadow-lg z-50">
                        <button
                            className="block w-full px-4 py-2 text-left text-white hover:bg-blue-700"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
