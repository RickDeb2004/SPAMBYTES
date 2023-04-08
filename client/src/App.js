import React from "react";
import Route from "./components/Route";
import CustomerSignup_1s from "./pages/CustomerSignup_1";
import SellerSignUp_1 from "./pages/SellerSignup_1";
import LandingPage from "./pages/LandingPage";
import DeliveryPersonSignUp from "./pages/DeliveryPersonSignUp";
import PhNumberVerification from "./pages/PhNumberVerification";
import CustomerSignup_2 from "./pages/CustomerSignup_2";

const App = () => {
    return (
        <div className="col-span-5">
            <Route path="/">
                <LandingPage />
            </Route>
            <Route path="/seller_signup">
                <SellerSignUp_1 />
            </Route>
            <Route path="/buyer_signup">
                <CustomerSignup_1s />
            </Route>
            <Route path="/dp_signup">
                <DeliveryPersonSignUp />
            </Route>
            <Route path="/ph_verify">
                <PhNumberVerification />
            </Route>
            <Route path="/buyer_signup_2"></Route>
        </div>
    );
};

export default App;
