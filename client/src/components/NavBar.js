import React from "react";
import Link from "./Link";
import Button from "./Button";
import Link2 from "./Link";

const NavBar = ({ address }) => {
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div>DeEcomm</div>
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <form>
                            <div className="flex items-center border-b border-gray-500 py-2">
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <Button
                                    className="flex-shrink-0 bg-gray-700 hover:bg-gray-600 border-gray-700 hover:border-gray-600 text-sm border-4 text-white py-1 px-2 rounded"
                                    type="button"
                                >
                                    Search
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                <Link2>SignUp</Link2>
                <div>{address.slice(0, 6) + "..."}</div>
            </div>
        </nav>
    );
};

export default NavBar;
