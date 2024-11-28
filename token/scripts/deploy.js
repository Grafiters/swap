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

    // WETH
    const _WBETH = await ethers.getContractFactory("WBETH");
    const WBETH = await _WBETH.deploy();
    await WBETH.deployed();
    console.log("WBETH address:", WBETH.address);
    await writeAddr(WBETH.address, "WBETH");

    // WETH
    const _WETH = await ethers.getContractFactory("WETH");
    const WETH = await _WETH.deploy();
    await WETH.deployed();
    console.log("WETH address:", WETH.address);
    await writeAddr(WETH.address, "WETH");

    // USDTToken
    const _ROBOToken = await ethers.getContractFactory("BEP20ROBO");
    const ROBOToken = await _ROBOToken.deploy();
    await ROBOToken.deployed();
    console.log("ROBOToken address:", ROBOToken.address);
    await writeAddr(ROBOToken.address, "ROBO");

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
  