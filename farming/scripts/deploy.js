const { writeAddr,writeJson } = require("./artifact_log")
const WSPCJSON = require("../../deployments/1503/WSPC")
const CITYJSON = require("../../deployments/1503/CITY")
const SUSDJSON = require("../../deployments/1503/SUSD")

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
     
    const SpcSwapFactoryAddress = require("../../deployments/1503/SpcSwapFactory")
    const LFactory = await ethers.getContractAt("SpcSwapFactory", SpcSwapFactoryAddress.address);

    // createPair CITY-SUSD LP 
    // const _CITY_SUSD_PairAddress = await LFactory.createPair(CITYJSON.address, SUSDJSON.address);
    // await _CITY_SUSD_PairAddress.wait();

    const CITY_SUSD_PairAddress = await LFactory.getPair(CITYJSON.address, SUSDJSON.address);
    console.log("CITY-SUSD LP addresss:", CITY_SUSD_PairAddress)

    const WSPC_SUSD_PairAddress = await LFactory.getPair(WSPCJSON.address, SUSDJSON.address);
    console.log("WSPC-SUSD LP addresss:", WSPC_SUSD_PairAddress)
  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  