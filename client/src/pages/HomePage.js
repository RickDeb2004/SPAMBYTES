import React from "react";
import { useState } from "react";
import Dropdown from "../components/Dropdown";
import NavBar from "../components/NavBar";

const HomePage = ({ address }) => {
    const links = [
        {
            label: "Seller SignUp",
            path: "/seller_signup",
        },
        {
            label: "Buyer SignUp",
            path: "/buyer_signup",
        },
        {
            label: "DP_SignUp",
            path: "/dp_signup",
        },
    ];

    return (
        <div>
            <NavBar links={links} address={address} />
        </div>
    );
};

export default HomePage;
