import React from "react";
import { useState } from "react";
import Button from "../components/Button";
import useNavigation from "../hooks/use-navigation";

const SellerSignup_1 = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const { navigate } = useNavigation();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            `First Name is ${firstName}, Last Name is ${lastName} and the email address is ${email}`
        );
        navigate("/seller_signup2");
    };

    return (
        <div>
            <h1>Seller SignUp</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={firstName}
                    placeholder="Enter First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                />
                <input
                    value={lastName}
                    placeholder="Enter Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                />
                <input
                    value={email}
                    placeholder="Enter Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                />
                <Button primary type="submit">
                    Continue
                </Button>
            </form>
        </div>
    );
};

export default SellerSignup_1;
