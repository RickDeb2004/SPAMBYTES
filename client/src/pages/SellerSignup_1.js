import React from "react";
import { useState } from "react";
import Button from "../components/Button";
import useNavigation from "../hooks/use-navigation";

const SellerSignup_1 = ({ getDetails }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const { navigate } = useNavigation();

    const handleSubmit = (e) => {
        if ((!firstName, !setFirstName, !lastName, !email)) {
            alert("Fill Details");
        } else {
            e.preventDefault();
            getDetails(firstName, lastName, email);
            navigate("/seller_signup2");
        }
    };

    return (
        <div className="bg-[url('../public/960x0-1@2x.png')] bg-cover h-screen">
            <h1 className="text-white text-3xl absolute top-[100px] left-[600px]">
                Seller SignUp
            </h1>
            <form onSubmit={handleSubmit}>
                <input
                    className=" absolute top-[200px] left-[400px] rounded"
                    value={firstName}
                    placeholder="Enter First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                />
                <input
                    className="absolute top-[200px] left-[750px] rounded"
                    value={lastName}
                    placeholder="Enter Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                />
                <input
                    className="absolute top-[400px] left-[600px] rounded"
                    value={email}
                    placeholder="Enter Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                />
                <Button
                    primary
                    type="submit"
                    className="absolute top-[600px] left-[670px]"
                >
                    Continue
                </Button>
            </form>
        </div>
    );
};

export default SellerSignup_1;
