const { writeAddr,writeJson } = require("./artifact_log")
const WBETHJSON = require("../../deployments/97/WBETH")
const ROBOJSON = require("../../deployments/97/ROBO")
const USDTJSON = require("../../deployments/97/USDT")
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
     
    const RoboSwapFactoryAddress = require("../../deployments/97/RoboSwapFactory")
    const LFactory = await ethers.getContractAt("RoboSwapFactory", RoboSwapFactoryAddress.address);

    // createPair CITY-SUSD LP 
    const _CITY_SUSD_PairAddress = await LFactory.createPair(ROBOJSON.address, USDTJSON.address);
    await _CITY_SUSD_PairAddress.wait();

    const CITY_SUSD_PairAddress = await LFactory.getPair(ROBOJSON.address, USDTJSON.address);
    console.log("CITY-SUSD LP addresss:", CITY_SUSD_PairAddress)

    // const WSPC_SUSD_PairAddress = await LFactory.getPair(WSPCJSON.address, SUSDJSON.address);
    // console.log("WSPC-SUSD LP addresss:", WSPC_SUSD_PairAddress)
  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  