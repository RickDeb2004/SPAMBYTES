import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import Button from "../components/Button";
import abi from "../artifacts/contracts/DeEcomm.sol/DeEcomm.json";
import useNavigation from "../hooks/use-navigation";

const LandingPage = ({ getDefaultAccount }) => {
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [signer, setSigner] = useState(null);

    const { navigate } = useNavigation();

    const connectWallet = async () => {
        const contractAddress = "0x2b15957DcBaFaE7C1582a82d9A24C9371E145645";
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

    const rederedPages = async () => {
        let value = await contract.buyerSignUpCheck(defaultAccount.toString());
        console.log(value);
    };

    return (
        <div>
            {defaultAccount ? (
                //<PhNumberVerification contract={contract} signer={signer} />
                (getDefaultAccount(defaultAccount), navigate("/home_page"))
            ) : (
                <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
                    <img
                        className="absolute top-[0px] left-[0px] w-[1460px] h-[1063px] object-cover"
                        alt=""
                        src="/960x0-1@2x.png"
                    />
                    <Button
                        warning
                        rounded
                        type="button"
                        className="cursor-pointer [border:none] p-0 bg-[orange] absolute top-[400px] left-[605px] text-xl  font-imprima text-white text-left inline-block"
                        onClick={connectWallet}
                    >
                        Connect To MetaMask
                    </Button>
                </div>
            )}
        </div>

        //<NavBar links={links} address={defaultAccount} />
    );
};

export default LandingPage;
