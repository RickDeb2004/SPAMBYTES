import React from "react";
import Route from "./components/Route";
import NavBar from "./components/NavBar";
import ButtonPage from "./pages/ButtonPage";
import ModalPage from "./pages/ModalPage";

const App = () => {
    return (
        <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
            <NavBar />
            <div className="col-span-5">
                <Route path="/">App</Route>
                <Route path="/buttons">
                    <ButtonPage />
                </Route>
                <Route path="/modal">
                    <ModalPage />
                </Route>
            </div>
        </div>
    );
};

export default App;
