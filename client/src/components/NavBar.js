import React from "react";
import Link from "./Link";

const NavBar = () => {
    const links = [
        {
            label: "Homepage",
            path: "/",
        },
        {
            label: "Button",
            path: "/buttons",
        },
        {
            label: "Modal",
            path: "/modal",
        },
        {
            label: "phVerification",
            path: "/phVeri",
        },
    ];

    const renderedLinks = links.map((link) => {
        return (
            <Link
                to={link.path}
                key={link.label}
                className="mb-3"
                activeClassName="font-bold pl-2"
            >
                {link.label}
            </Link>
        );
    });

    return (
        <div>
            <div>{renderedLinks}</div>
        </div>
    );
};

export default NavBar;
