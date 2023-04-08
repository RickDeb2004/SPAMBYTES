import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import Route from "./components/Route";
import NavBar from "./components/NavBar";
import ButtonPage from "./pages/ButtonPage";
import ModalPage from "./pages/ModalPage";
import Button from "./components/Button";
import Contract from "./artifacts/contracts/DeEcomm.sol/DeEcomm.json";

const { ethereum } = window;

const App = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connButtonText, setConnButtonText] = useState("Connect Wallet");
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [signer, setSigner] = useState(null);

    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            console.log("MetaMask Here!");

            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((result) => {
                    accountChangedHandler(result[0]);
                    setConnButtonText("Connected...");
                    getUserBalance(result[0]);
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                });
        } else {
            console.log("Need to install MetaMask");
            setErrorMessage(
                "Please install MetaMask browser extension to interact"
            );
        }
    };

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount);
        updateEthers();
    };

    const chainChangedHandler = () => {
        window.location.reload();
    };
    window.ethereum.on("accountsChanged", accountChangedHandler);

    window.ethereum.on("chainChanged", chainChangedHandler);

    const updateEthers = () => {
        let tempProvider = new ethers.providers.Web3Provider(ethereum);
        setProvider(tempProvider);

        let tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);

        const contractAddress = "0xA1d1b966d4E3Be90389846e4ec3Da1Fb3243Ba9b"; //test network address 0xa9FcB826138c55E2870C251C2EA56E04ac1Cb6F2
        let tempContract = new ethers.Contract(
            contractAddress,
            Contract.abi,
            tempSigner
        );
        setContract(tempContract);
    };

    const getUserBalance = (account) => {
        window.ethereum
            .request({ method: "eth_getBalance", params: [account, "latest"] })
            .then((balance) => {
                setUserBalance(ethers.utils.formatEther(balance));
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    const getContract = () => {
        console.log(contract);
    };

    return (
        <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
            {defaultAccount ? (
                <Button primary type="button" className="nav__connect mb-5">
                    {defaultAccount.slice(0, 6) +
                        "..." +
                        defaultAccount.slice(38, 42)}
                </Button>
            ) : (
                <Button
                    primary
                    type="button"
                    className="nav__connect mb-5"
                    onClick={connectWalletHandler}
                >
                    Connect
                </Button>
            )}
            <div>Balance: {userBalance}</div>

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
