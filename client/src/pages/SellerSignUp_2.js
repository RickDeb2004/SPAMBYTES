import React from "react";
import { useState, useMemo } from "react";
import Button from "../components/Button";
import useNavigation from "../hooks/use-navigation";
import Select from "react-select";
import countryList from "react-select-country-list";

const SellerSignup_2 = ({ getAddress }) => {
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
            getAddress(address, Country.label, teritory, city, pincode);
            navigate("/ph_verify_sell");
        }
    };

    return (
        <div className="bg-[url('../public/960x0-1@2x.png')] bg-cover h-screen">
            <h1>Seller SignUp</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={address}
                    placeholder="Enter Full address"
                    onChange={(e) => setAddress(e.target.value)}
                    type="address"
                />
                <Select
                    options={options}
                    value={Country}
                    onChange={changeHandler}
                />
                <input
                    value={teritory}
                    placeholder="Enter State/Teritory"
                    onChange={(e) => setTeritory(e.target.value)}
                    type="text"
                />
                <input
                    value={city}
                    placeholder="Enter City"
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                />
                <input
                    value={pincode}
                    placeholder="Enter city pincode"
                    onChange={(e) => setPincode(e.target.value)}
                    type="number"
                />
                <Button primary type="submit">
                    Continue
                </Button>
            </form>
        </div>
    );
};

export default SellerSignup_2;
