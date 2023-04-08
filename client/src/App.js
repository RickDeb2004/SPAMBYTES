import React from "react";
import { useState } from "react";
import Route from "./components/Route";
import CustomerSignup_1 from "./pages/CustomerSignup_1";
import SellerSignup_1 from "./pages/SellerSignup_1";
import LandingPage from "./pages/LandingPage";
import DeliveryPersonSignUp from "./pages/DeliveryPersonSignUp";
import PhNumberVerification from "./pages/PhNumberVerification";
import CustomerSignup_2 from "./pages/CustomerSignup_2";
import SellerSignup_2 from "./pages/CustomerSignup_2";
import HomePage from "./pages/HomePage";

const App = () => {
    const [defaultAccount, setDefaultAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    const getDefaultAccount = (account) => {
        setDefaultAccount(account);
    };

    return (
        <div className="col-span-5">
            <Route path="/">
                <LandingPage getDefaultAccount={getDefaultAccount} />
            </Route>

            <Route path="/seller_signup">
                <SellerSignup_1 />
            </Route>

            <Route path="/seller_signup2">
                <SellerSignup_2 />
            </Route>

            <Route path="/buyer_signup">
                <CustomerSignup_1 />
            </Route>

            <Route path="/dp_signup">
                <DeliveryPersonSignUp />
            </Route>

            <Route path="/ph_verify">
                <PhNumberVerification />
            </Route>

            <Route path="/buyer_signup_2">
                <CustomerSignup_2 />
            </Route>

            <Route path="/home_page">
                <HomePage address={defaultAccount} />
            </Route>
        </div>
    );
};

export default App;
