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
     
    // deployer address as feeToSetter
    feeToSetter = deployer.getAddress()

    // // Fill your address as feeToSetter in constructor -> Deploy
    const _SpcSwapFactory = await ethers.getContractFactory("SpcSwapFactory");
    const SpcSwapFactory = await _SpcSwapFactory.deploy(feeToSetter);
    await SpcSwapFactory.deployed();
    console.log("SpcSwapFactory address:", SpcSwapFactory.address);
    await writeAddr(SpcSwapFactory.address, "SpcSwapFactory");

    const SpcSwapFactoryAddress = require("../../deployments/1503/SpcSwapFactory")
    const LFactory = await ethers.getContractAt("SpcSwapFactory", SpcSwapFactoryAddress.address);
    const init_code_pair_hash = await LFactory.INIT_CODE_HASH();
    console.log("init_code_pair_hash:", init_code_pair_hash)
    await writeJson("INIT_CODE_PAIR_HASH", init_code_pair_hash, "INIT_CODE_PAIR_HASH")


    // Multicall3
    const _Multicall3 = await ethers.getContractFactory("Multicall3");
    const Multicall3 = await _Multicall3.deploy();
    await Multicall3.deployed();
    console.log("Multicall3 address:", Multicall3.address);
    await writeAddr(Multicall3.address, "Multicall3");
    
    const { writeHex } = require("./writeFile/writeFile")
    await writeHex()
    
    const _SpcV2Router02 = await ethers.getContractFactory("SpcV2Router02");
    const SpcV2Router02 = await _SpcV2Router02.deploy(SpcSwapFactoryAddress.address, WSPCJSON.address);
    await SpcV2Router02.deployed();
    await writeAddr(SpcV2Router02.address, "SpcV2Router02");
    console.log("SpcV2Router02 address:", SpcV2Router02.address);

    // Masterchef
    const _SpcLiquidity = await ethers.getContractFactory("CityLiquidity");
    const SpcLiquidity = await _SpcLiquidity.deploy(CITYJSON.address, "20000000", feeToSetter);
    await SpcLiquidity.deployed();
    console.log("SpcLiquidity address:", SpcLiquidity.address);
    await writeAddr(SpcLiquidity.address, "SpcLiquidity");

    // TokenLockFactory
    const _TokenLockFactory = await ethers.getContractFactory("TokenLockFactory");
    const TokenLockFactory = await _TokenLockFactory.deploy();
    await TokenLockFactory.deployed();
    console.log("TokenLockFactory address:", TokenLockFactory.address);
    await writeAddr(TokenLockFactory.address, "TokenLockFactory");


    // createPair SPC-SUSD LP 
    const _SPC_SUSD_PairAddress = await LFactory.createPair(WSPCJSON.address, SUSDJSON.address);
    await _SPC_SUSD_PairAddress.wait();
    const SPC_SUSD_PairAddress = await LFactory.getPair(WSPCJSON.address, SUSDJSON.address);
    console.log("SPC-SUSD LP addresss:", SPC_SUSD_PairAddress)
    await writeAddr(SPC_SUSD_PairAddress, "SPC_SUSD_PairAddress");


    // createPair CITY-SPC LP 
    const _CITY_SPC_PairAddress = await LFactory.createPair(CITYJSON.address, WSPCJSON.address);
    await _CITY_SPC_PairAddress.wait();
    const CITY_SPC_PairAddress = await LFactory.getPair(CITYJSON.address, WSPCJSON.address);
    console.log("CITY-SPC LP addresss:", CITY_SPC_PairAddress)
    await writeAddr(CITY_SPC_PairAddress, "CITY_SPC_PairAddress");

  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  