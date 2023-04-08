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
