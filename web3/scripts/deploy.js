const { ethers } = require("hardhat");

const main = async () => {
    //Creating contract factory meaning adding abi, provider, address, etc.
    const DeEcommFactory = await ethers.getContractFactory("DeEcomm");

    //Deploying contract using contract factory.
    console.log("Deploying Contract...");
    const deEcomm = await DeEcommFactory.deploy();
    await deEcomm.deployed();
    console.log(`Contract deployed at: ${deEcomm.address}`);

    //Veryfying contract.
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        await deEcomm.deployTransaction.wait(6);
        await verify(deEcomm.address, []);
    }
};

const verify = async (contractAddress, args) => {
    console.log("Veryfying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArgumners: args,
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!");
        } else {
            console.log(e);
        }
    }
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
