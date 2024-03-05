const { writeAddr,writeJson } = require("./artifact_log")
// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
    // This is just a convenience check
    if (network.name === "hardhat") {
      console.warn(
        "You are trying to deploy a contract to the Hardhat Network, which" +
          "gets automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      );
    }
  
    // ethers is avaialble in the global scope
    const [deployer] = await ethers.getSigners();
    console.log(
      "Deploying the contracts with the account:",
      await deployer.getAddress()
    );
  
    console.log("Account balance:", (await deployer.getBalance()).toString());

    // WBTC
    const _WBTC = await ethers.getContractFactory("WBTC");
    const WBTC= await _WBTC.deploy();
    await WBTC.deployed();
    console.log("WBTC address:", WBTC.address);
    await writeAddr(WBTC.address, "WBTC");

    // WETH
    const _WETH = await ethers.getContractFactory("WETH");
    const WETH = await _WETH.deploy();
    await WETH.deployed();
    console.log("WETH address:", WETH.address);
    await writeAddr(WETH.address, "WETH");
      
    // WSPC
    const _WSPC = await ethers.getContractFactory("WSPC");
    const WSPC = await _WSPC.deploy();
    await WSPC.deployed();
    console.log("WSPC address:", WSPC.address);
    await writeAddr(WSPC.address, "WSPC");

    // SUSD
    const _SUSD = await ethers.getContractFactory("StableUSD");
    const SUSD = await _SUSD.deploy();
    await SUSD.deployed();
    console.log("SUSD address:", SUSD.address);
    await writeAddr(SUSD.address, "SUSD");    
    
    
    // CITY
    const _CITY = await ethers.getContractFactory("CityToken");
    const CITY = await _CITY.deploy("CITY Token", "CITY", "99000000000000000000000000");
    await CITY.deployed();
    console.log("CITY address:", CITY.address);
    await writeAddr(CITY.address, "CITY");

    
    // SpcNFT
    const _SpcNFT = await ethers.getContractFactory("SpcNFT");
    const SpcNFT = await _SpcNFT.deploy();
    await SpcNFT.deployed();
    console.log("SpcNFT address:", SpcNFT.address);
    await writeAddr(SpcNFT.address, "SpcNFT");
       
    // DAIToken
    const _DAIToken = await ethers.getContractFactory("BEP20DAI");
    const DAIToken = await _DAIToken.deploy();
    await DAIToken.deployed();
    console.log("DAIToken address:", DAIToken.address);
    await writeAddr(DAIToken.address, "DAI");

    // USDTToken
    const _USDTToken = await ethers.getContractFactory("BEP20USDT");
    const USDTToken = await _USDTToken.deploy();
    await USDTToken.deployed();
    console.log("USDTToken address:", USDTToken.address);
    await writeAddr(USDTToken.address, "USDT");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  