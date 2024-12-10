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
     
    // // deployer address as feeToSetter
    feeToSetter = deployer.getAddress()

    // // Fill your address as feeToSetter in constructor -> Deploy
    // const _RoboSwapFactory = await ethers.getContractFactory("RoboSwapFactory");
    // const RoboSwapFactory = await _RoboSwapFactory.deploy(feeToSetter);
    // await RoboSwapFactory.deployed();
    // console.log("RoboSwapFactory address:", RoboSwapFactory.address);
    // await writeAddr(RoboSwapFactory.address, "RoboSwapFactory");

    const RoboSwapFactoryAddress = require("../../deployments/97/RoboSwapFactory")
    // const LFactory = await ethers.getContractAt("RoboSwapFactory", RoboSwapFactoryAddress.address);
    // const init_code_pair_hash = await LFactory.INIT_CODE_HASH();
    // console.log("init_code_pair_hash:", init_code_pair_hash)
    // await writeJson("INIT_CODE_PAIR_HASH", init_code_pair_hash, "INIT_CODE_PAIR_HASH")


    // Multicall3
    const _Multicall3 = await ethers.getContractFactory("Multicall3");
    const Multicall3 = await _Multicall3.deploy();
    await Multicall3.deployed();
    console.log("Multicall3 address:", Multicall3.address);
    await writeAddr(Multicall3.address, "Multicall3");
    
    // const { writeHex } = require("./writeFile/writeFile")
    // await writeHex()
    
    const _RoboV2Router02 = await ethers.getContractFactory("RoboV2Router02");
    const RoboV2Router02 = await _RoboV2Router02.deploy(RoboSwapFactoryAddress.address, WBETHJSON.address);
    await RoboV2Router02.deployed();
    await writeAddr(RoboV2Router02.address, "RoboV2Router02");
    console.log("RoboV2Router02 address:", RoboV2Router02.address);

    const RobocLiquidity = await ethers.getContractFactory("RoboLiquidity");
    const RoboLiquidity = await RobocLiquidity.deploy(ROBOJSON.address, "20000000", feeToSetter);
    await RoboLiquidity.deployed();
    console.log("RoboLiquidity address:", RoboLiquidity.address);
    await writeAddr(RoboLiquidity.address, "RoboLiquidity");

    // TokenLockFactory
    const _TokenLockFactory = await ethers.getContractFactory("TokenLockFactory");
    const TokenLockFactory = await _TokenLockFactory.deploy();
    await TokenLockFactory.deployed();
    console.log("TokenLockFactory address:", TokenLockFactory.address);
    await writeAddr(TokenLockFactory.address, "TokenLockFactory");


    // createPair SPC-USDT LP 
    // const _SPC_USDT_PairAddress = await LFactory.createPair(WBETHJSON.address, USDTJSON.address);
    // await _SPC_USDT_PairAddress.wait();
    // const SPC_USDT_PairAddress = await LFactory.getPair(WBETHJSON.address, USDTJSON.address);
    // console.log("SPC-USDT LP addresss:", SPC_USDT_PairAddress)
    // await writeAddr(SPC_USDT_PairAddress, "SPC_USDT_PairAddress");


    // // createPair ROBO-SPC LP 
    // const _ROBO_SPC_PairAddress = await LFactory.createPair(ROBOJSON.address, WBETHJSON.address);
    // await _ROBO_SPC_PairAddress.wait();
    // const ROBO_SPC_PairAddress = await LFactory.getPair(ROBOJSON.address, WBETHJSON.address);
    // console.log("ROBO-SPC LP addresss:", ROBO_SPC_PairAddress)
    // await writeAddr(ROBO_SPC_PairAddress, "ROBO_SPC_PairAddress");

  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  