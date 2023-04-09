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
import SellerHome from "./pages/SellerHome";
import useNavigation from "./hooks/use-navigation";

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

    const [sellerName, setSellerName] = useState(null);
    const [sellerLastName, setSellerLastName] = useState(null);
    const [sellerEmail, setSellerEmail] = useState(null);
    const [sellerAddress, setSellerAddress] = useState(null);
    const [sellerCountry, setSellerCountry] = useState(null);
    const [sellerTeritory, setSellerTeritory] = useState(null);
    const [sellerCity, setSellerCity] = useState(null);
    const [sellerPinCode, setSellerPincode] = useState(null);
    const [sellerPhNumber, setSellerPhNumber] = useState(null);

    const { navigate } = useNavigation();

    const getChainDetails = (account, contract, provider, signer) => {
        setDefaultAccount(account);
        setContract(contract);
        setProvider(provider);
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

    const getPersonalDetailsSeller = (firstName, lastName, email) => {
        setSellerName(firstName);
        setSellerLastName(lastName);
        setSellerEmail(email);
    };

    const getSellerAddress = (address, Country, teritory, city, pincode) => {
        setSellerAddress(address);
        setSellerCountry(Country.label);
        setSellerTeritory(teritory);
        setSellerCity(city);
        setSellerPincode(pincode);
    };

    const getSellerPhNumber = (phNumber) => {
        setSellerPhNumber(phNumber);
    };

    const addBuyerDetails = async (
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

        const value = await contract.signUpForBuyer(
            name,
            locPinCode,
            locationName,
            buyerPhNumber
        );

        // if (value) {
        //     navigate("/buyer_home_page");
        // }

        console.log(value);
    };

    const addSellerDetails = async (
        sellerName,
        sellerLastName,
        sellerEmail,
        sellerAddress,
        sellerCountry,
        sellerTeritory,
        sellerCity,
        sellerPinCode,
        sellerPhNumber
    ) => {
        const locationName = ` ${sellerAddress} ,${sellerCity}, ${sellerTeritory}, ${sellerCountry}`;
        const name = `${sellerName} ${sellerLastName}`;
        const locPinCode = parseInt(sellerPinCode);

        const value = await contract.signUpForSeller(
            name,
            locPinCode,
            locationName,
            sellerPhNumber
        );

        // if (value) {
        //     navigate("/seller_home_page");
        // }

        console.log(value);
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
        addBuyerDetails(
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

    if (
        (sellerName,
        sellerLastName,
        sellerEmail,
        sellerAddress,
        sellerCountry,
        sellerTeritory,
        sellerCity,
        sellerPinCode,
        sellerPhNumber)
    ) {
        addSellerDetails(
            sellerName,
            sellerLastName,
            sellerEmail,
            sellerAddress,
            sellerCountry,
            sellerTeritory,
            sellerCity,
            sellerPinCode,
            sellerPhNumber
        );
    }

    return (
        <div className="col-span-5">
            <Route path="/">
                <LandingPage getChainDetails={getChainDetails} />
            </Route>

            <Route path="/seller_signup">
                <SellerSignup_1
                    contract={contract}
                    provider={provider}
                    signer={signer}
                    getDetails={getPersonalDetailsSeller}
                />
            </Route>

            <Route path="/seller_signup2">
                <SellerSignup_2
                    contract={contract}
                    provider={provider}
                    signer={signer}
                    getAddress={getSellerAddress}
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
                    getPhNo={getSellerPhNumber}
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

            <Route path="/seller_home_page">
                <SellerHome />
            </Route>
        </div>
    );
};

export default App;
