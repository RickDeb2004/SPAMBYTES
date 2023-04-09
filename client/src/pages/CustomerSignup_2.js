import React from "react";
import { useState, useMemo } from "react";
import Button from "../components/Button";
import useNavigation from "../hooks/use-navigation";
import Select from "react-select";
import countryList from "react-select-country-list";

const CustomerSignup_2 = ({ getAddress }) => {
    const [address, setAddress] = useState("");
    const [Country, setCountry] = useState("");
    const [teritory, setTeritory] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const { navigate } = useNavigation();

    const options = useMemo(() => countryList().getData(), []);

    const changeHandler = (Country) => {
        setCountry(Country);
    };

    const handleSubmit = (e) => {
        if ((!address, !Country, !teritory, !city, !pincode)) {
            alert("Fill Details");
        } else {
            e.preventDefault();
            getAddress(address, Country, teritory, city, pincode);
            navigate("/ph_verify_cus");
        }
    };

    return (
        <div className=" bg-[url('../public/960x0-1@2x.png')] bg-cover h-screen">
            <h1 className=" absolute top-[90px] left-[600px] text-white text-3xl">Buyer SignUp</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="absolute top-[200px] left-[600px]"
                    value={address}
                    placeholder="Enter Full address"
                    onChange={(e) => setAddress(e.target.value)}
                    type="address"
                />
                <Select
                    className="absolute top-[400px] left-[480px] w-[500px]"
                    options={options}
                    value={Country}
                    onChange={changeHandler}
                />
                <input
                    className="absolute top-[300px] left-[450px]"
                    value={teritory}
                    placeholder="Enter State/Territory"
                    onChange={(e) => setTeritory(e.target.value)}
                    type="text"
                />
                <input
                    className="absolute top-[300px] left-[650px]"
                    value={city}
                    placeholder="Enter City"
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                />
                <input
                    className="absolute top-[300px] left-[850px]"
                    value={pincode}
                    placeholder="Enter city pincode"
                    onChange={(e) => setPincode(e.target.value)}
                    type="number"
                />
                <Button
                    primary
                    type="submit"
                    className="absolute top-[550px] left-[680px]"
                >
                    Continue
                </Button>
            </form>
        </div>
    );
};

export default CustomerSignup_2;
