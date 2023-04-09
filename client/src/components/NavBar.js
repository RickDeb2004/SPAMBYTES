import React from "react";
import Button from "./Button";
import useNavigation from "../hooks/use-navigation";
import { useState } from "react";

const NavBar = ({ address, link, getSearchTerm }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const { navigate } = useNavigation();

    const handleClick = () => {
        navigate(link.path);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getSearchTerm(searchTerm);
    };

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div>DeEcomm</div>
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <form onSubmit={handleSubmit}>
                            <div className="flex items-center border-b border-gray-500 py-2">
                                <input
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <Button
                                    className="flex-shrink-0 bg-gray-700 hover:bg-gray-600 border-gray-700 hover:border-gray-600 text-sm border-4 text-white py-1 px-2 rounded"
                                    type="submit"
                                >
                                    Search
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                <Button primary onClick={handleClick}>
                    Sign Up
                </Button>
            </div>
        </nav>
    );
};

export default NavBar;
