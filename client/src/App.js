import React from "react";
import { useState } from "react";
import Route from "./components/Route";
import CustomerSignup_1 from "./pages/CustomerSignup_1";
import SellerSignup_1 from "./pages/SellerSignup_1";
import LandingPage from "./pages/LandingPage";
import DeliveryPersonSignUp from "./pages/DeliveryPersonSignUp";
import PhNumberVerificationCustomer from "./pages/PhNumberVerificationCustomer";
import PhNumberVerificationSeller from "./pages/PhNumberVerificationSeller";
import CustomerSignup_2 from "./pages/CustomerSignup_2";
import SellerSignup_2 from "./pages/CustomerSignup_2";
import HomePage from "./pages/HomePage";
import Home from "./pages/BuyerHome";

const App = () => {
    const [defaultAccount, setDefaultAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [buyerName, setBuyerName] = useState(null);
    const [buyerLastName, setBuyerLastName] = useState(null);
    const [buyerEmail, setBuyerEmail] = useState(null);
    const [buyerAddress, setBuyerAddress] = useState(null);
    const [buyerCountry, setBuyerCountry] = useState(null);
    const [buyerTeritory, setBuyerTeritory] = useState(null);
    const [buyerCity, setBuyerCity] = useState(null);
    const [buyerPinCode, setBuyerPincode] = useState(null);
    const [buyerPhNumber, setBuyerPhNumber] = useState(null);

    const getDefaultAccount = (account) => {
        setDefaultAccount(account);
    };

    const getContract = (contract) => {
        setContract(contract);
    };

    const getProvider = (provider) => {
        setProvider(provider);
    };

    const getSigner = (signer) => {
        setSigner(signer);
    };

    const getPersonalDetailsBuyer = (firstName, lastName, email) => {
        setBuyerName(firstName);
        setBuyerLastName(lastName);
        setBuyerEmail(email);
    };

    const getBuyerAddress = (address, Country, teritory, city, pincode) => {
        setBuyerAddress(address);
        setBuyerCountry(Country.label);
        setBuyerTeritory(teritory);
        setBuyerCity(city);
        setBuyerPincode(pincode);
    };

    const getBuyerPhNumber = (phNumber) => {
        setBuyerPhNumber(phNumber);
    };

    const addDetails = async (
        buyerName,
        buyerLastName,
        buyerEmail,
        buyerAddress,
        buyerCountry,
        buyerTeritory,
        buyerCity,
        buyerPinCode,
        buyerPhNumber
    ) => {
        const locationName = ` ${buyerAddress} ,${buyerCity}, ${buyerTeritory}, ${buyerCountry}`;
        const name = `${buyerName} ${buyerLastName}`;
        const locPinCode = parseInt(buyerPinCode);

        await contract.signUpForBuyer(
            signer,
            name,
            locPinCode,
            locationName,
            buyerPhNumber
        );

        console.log("Success");
    };

    if (
        buyerName &&
        buyerLastName &&
        buyerEmail &&
        buyerAddress &&
        buyerCountry &&
        buyerTeritory &&
        buyerCity &&
        buyerPinCode &&
        buyerPhNumber
    ) {
        addDetails(
            buyerName,
            buyerLastName,
            buyerEmail,
            buyerAddress,
            buyerCountry,
            buyerTeritory,
            buyerCity,
            buyerPinCode,
            buyerPhNumber
        );
    } else {
    }

    return (
        <div className="col-span-5">
            <Route path="/">
                <LandingPage
                    getDefaultAccount={getDefaultAccount}
                    getContract={getContract}
                    getProvider={getProvider}
                    getSigner={getSigner}
                />
            </Route>

            <Route path="/seller_signup">
                <SellerSignup_1
                    contract={contract}
                    provider={provider}
                    signer={signer}
                />
            </Route>

            <Route path="/seller_signup2">
                <SellerSignup_2
                    contract={contract}
                    provider={provider}
                    signer={signer}
                />
            </Route>

            <Route path="/buyer_signup">
                <CustomerSignup_1
                    contract={contract}
                    provider={provider}
                    signer={signer}
                    getDetails={getPersonalDetailsBuyer}
                />
            </Route>

            <Route path="/dp_signup">
                <DeliveryPersonSignUp
                    contract={contract}
                    provider={provider}
                    signer={signer}
                />
            </Route>

            <Route path="/ph_verify_cus">
                <PhNumberVerificationCustomer
                    contract={contract}
                    provider={provider}
                    signer={signer}
                    getPhNo={getBuyerPhNumber}
                />
            </Route>

            <Route path="/ph_verify_sell">
                <PhNumberVerificationSeller
                    contract={contract}
                    provider={provider}
                    signer={signer}
                />
            </Route>

            <Route path="/buyer_signup_2">
                <CustomerSignup_2
                    contract={contract}
                    provider={provider}
                    signer={signer}
                    getAddress={getBuyerAddress}
                />
            </Route>

            <Route path="/home_page">
                <HomePage address={defaultAccount} />
            </Route>

            <Route path="/buyer_home_page">
                <Home />
            </Route>
        </div>
    );
};

export default App;
