import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import Route from "./components/Route";
import NavBar from "./components/NavBar";
import ButtonPage from "./pages/ButtonPage";
import ModalPage from "./pages/ModalPage";
import Button from "./components/Button";
import abi from "./artifacts/contracts/DeEcomm.sol/DeEcomm.json";
import PhNumberVerification from "./pages/PhNumberVerification";

const App = () => {
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [signer, setSigner] = useState(null);

    const connectWallet = async () => {
        const contractAddress = "0x4ba2C480d0e25c6fE7fad819Eaa8CEaa7cB6c82B";
        const contractABI = abi.abi;
        try {
            const { ethereum } = window;

            if (ethereum) {
                const account = await ethereum.request({
                    method: "eth_requestAccounts",
                });

                window.ethereum.on("chainChanged", () => {
                    window.location.reload();
                });

                window.ethereum.on("accountsChanged", () => {
                    window.location.reload();
                });

                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );
                setDefaultAccount(account.toString());
                setProvider(provider);
                setSigner(signer);
                setContract(contract);
            } else {
                alert("Please install metamask");
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log(contract);

    return (
        // <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
        //     {defaultAccount ? (
        //         <Button primary type="button" className="nav__connect mb-5">
        //             {defaultAccount.slice(0, 6) +
        //                 "..." +
        //                 defaultAccount.slice(38, 42)}
        //         </Button>
        //     ) : (
        //         <Button
        //             primary
        //             type="button"
        //             className="nav__connect mb-5"
        //             onClick={connectWallet}
        //         >
        //             Connect
        //         </Button>
        //     )}

        //     <NavBar />
        //     <div className="col-span-5">
        //         <Route path="/">App</Route>
        //         <Route path="/buttons">
        //             <ButtonPage />
        //         </Route>
        //         <Route path="/modal">
        //             <ModalPage />
        //         </Route>
        //         <Route path="/phVeri">
        //             <PhNumberVerification />
        //         </Route>
        //     </div>
        // </div>
        <div>
            <NavBar address="0xb71e14b6c26d6109AA40ae452b049995CD6e38Ba" />
        </div>
    );
};

export default App;
