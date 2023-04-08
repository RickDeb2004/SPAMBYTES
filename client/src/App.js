import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import Route2 from "./components/Route2";
import NavBar from "./components/NavBar";
import Button from "./components/Button";
import abi from "./artifacts/contracts/DeEcomm.sol/DeEcomm.json";
import CustomerSignup_1 from "./pages/CustomerSignup_1s";
import HomePage from "./pages/HomePage";
import PhNumberVerification from "./pages/PhNumberVerification";
import Link2 from "./components/Link";
import ButtonPage from "./pages/ButtonPage";

const App = () => {
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [signer, setSigner] = useState(null);

    const connectWallet = async () => {
        const contractAddress = "0x47fF986531908B1C0fBDeE03292415A7DC8aD843";
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
                console.log(provider);
                console.log(signer);
                console.log(contract);
            } else {
                alert("Please install metamask");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const links = [];

    const rederedPages = async () => {
        let value = await contract.buyerSignUpCheck(defaultAccount.toString());
        console.log(value);
    };

    return (
        <div>
            {defaultAccount ? (
                <PhNumberVerification contract={contract} signer={signer} />
            ) : (
                <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
                    <Button
                        primary
                        type="button"
                        className="nav__connect mb-5"
                        onClick={connectWallet}
                    >
                        Connect
                    </Button>
                </div>
            )}

            <div className="col-span-5">
                <Route2 path="/">App</Route2>
            </div>
        </div>

        //<NavBar links={links} address={defaultAccount} />
    );
};

export default App;
