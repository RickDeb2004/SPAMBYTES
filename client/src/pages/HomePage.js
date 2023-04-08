import React from "react";
import Link from "../components/Link";
import NavBar from "../components/NavBar";

const HomePage = ({ address }) => {
    const link = {
        label: "Buyer SignUp",
        path: "/buyer_signup",
    };

    return (
        <div>
            <NavBar link={link} address={address} />
            <Link to="/seller_signup">Seller Sign Up</Link>
            <Link to="/dp_signup">Delivery Company Sign Up</Link>
        </div>
    );
};

export default HomePage;
