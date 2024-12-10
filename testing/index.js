const { ethers } = require("ethers");
const ROBO = require("../deployments/97/ROBO.json");
const USDT = require("../deployments/97/USDT.json");
const LIQUIDITY = require("../deployments/97/RoboLiquidity.json")
const FACTORY = require("../deployments/97/RoboSwapFactory.json")
const ROUTER = require("../deployments/97/RoboV2Router02.json")

const PrivKey = "9aca4cf105f87ee5ad3c972fcd24f464826e6e957b96944c46ae65a22ec72357";
const RPC = "https://data-seed-prebsc-1-s3.bnbchain.org:8545";

const amountBase = 10
const amountQuote = 10

async function main() {
    const provider = new ethers.JsonRpcProvider(RPC);
    const wallet = new ethers.Wallet(PrivKey, provider)
    const walletAddress = await wallet.getAddress()
    
    console.log(`========================`)
    console.log(`Balance Account ${walletAddress} => ${await provider.getBalance(wallet.getAddress())}`)
    console.log(`========================`)

    const robo = await roboConnection()
    const roboBalance = await robo.balance()

    const usdt = await usdtConnection()
    const usdtBalance = await usdt.balance()

    const routers = await router()
    const factories = await Factory()
    const liquidities = await liquidity()

    console.log(`========================`)
    console.log(`Balance`)
    console.log(`Robo => ${roboBalance}`)
    console.log(`Usdt => ${usdtBalance}`)
    console.log(`========================`)

    console.log(`====================================================`)
    console.log(`Approve Balance With Liquidity Address`)
    const baseApprove = await robo.approve(ROUTER.address, amountBase)
    const quoteApprove = await usdt.approve(ROUTER.address, amountQuote)
    
    console.log(`Base Approve => ${baseApprove}`)
    console.log(`Quote Approve => ${quoteApprove}`)

    const baseAllowance = await robo.allowance(ROUTER.address)
    const quoteAllowance = await robo.allowance(ROUTER.address)

    console.log(`Base Allowance => ${baseAllowance}`)
    console.log(`Quote Allowance => ${quoteAllowance}`)
    console.log(`====================================================`)

    console.log(`====================================================`)
    console.log(`Add liquidity for ${ROBO.address} - ${USDT.address}`)
    const addLiquidity = await routers.addLiquidity(
        ROBO.address,
        USDT.address,
        parseEthers().units(10),
        parseEthers().units(1),
        parseEthers().units(0.9),
        parseEthers().units(0.09),
        walletAddress
    )

    console.log(`done for add loquidity for them tx => ${addLiquidity}`)
    console.log(`====================================================`)

    console.log(`====================================================`)
    console.log(`create new pair`)
    await factories.createPair(ROBO.address, USDT.address)
    const lpToken = await factories.getPair(ROBO.address, USDT.address)
    console.log(lpToken)
    console.log(`done create new pair`)
    console.log(`====================================================`)

    console.log(`====================================================`)
    console.log(`create new farm`)
    // await liquidities.add(0, lpToken)

    const factorie = await facoryPairApprove(lpToken)
    const approve = factorie.approve(LIQUIDITY.address, parseEthers().units(1))
    console.log(`liquidity to pair is done ${approve.hash}`)

    const last_length = await liquidities.poolLength()
    console.log(`last length of all farm is ${last_length}`)
    console.log(`check allowance before deposit`)
    const allowanceBefore = await factorie.allowance(LIQUIDITY.address)
    console.log(`allowance => ${allowanceBefore}`)
    if (last_length > 0) {
        await liquidities.deposit((last_length - BigInt(1)), parseEthers().units(1))
    }

    console.log(`check allowance`)
    const allowance = await factorie.allowance(LIQUIDITY.address)
    console.log(`allowance => ${allowance}`)
    console.log(`done create new farm`)
    console.log(`====================================================`)

    console.log(`====================================================`)    
    console.log(`check userInfo`)
    const userInfo = await liquidities.userInfo(last_length - BigInt(1))
    console.log(userInfo)
    console.log(`====================================================`)    
}

function parseEthers() {
    return {
        units: (amount) => {
            return ethers.parseUnits(amount.toString(), 18)
        },
        ethers: (amount) => {
            return ethers.formatUnits(amount, 18)
        }
    }
}



async function roboConnection() {
    const provider = new ethers.JsonRpcProvider(RPC);
    const wallet = new ethers.Wallet(PrivKey, provider)
    const walletAddress = await wallet.getAddress()

    const AbiErc20SolidityRobo = require("../token/artifacts/contracts/ROBO.sol/BEP20ROBO.json")

    const roboErcContract = new ethers.Contract(
        ROBO.address,
        AbiErc20SolidityRobo.abi,
        wallet
    )

    return {
        balance: async() => {
            const robo = await roboErcContract.balanceOf(walletAddress)
            return ethers.formatUnits(robo, 18);
        },
        allowance: async(spender) => {
            const allowance = await roboErcContract.allowance(walletAddress, spender);
            return ethers.formatUnits(allowance, 18);
        },
        approve: async(spender, amount) => {
            const formatUnit = ethers.parseUnits(amount.toString(), 18)
            const tx = await roboErcContract.approve(spender, formatUnit)
            console.log(`approve processing .....`, tx.hash)
            await tx.wait();
            console.log(`approve done`)
            return tx.hash
        }
    }
}

async function usdtConnection() {
    const provider = new ethers.JsonRpcProvider(RPC);
    const wallet = new ethers.Wallet(PrivKey, provider)
    const walletAddress = await wallet.getAddress()

    const AbiErc20SolidityRobo = require("../token/artifacts/contracts/USDT.sol/BEP20USDT.json")

    const roboErcContract = new ethers.Contract(
        USDT.address,
        AbiErc20SolidityRobo.abi,
        wallet
    )

    return {
        balance: async() => {
            const robo = await roboErcContract.balanceOf(walletAddress)
            return ethers.formatUnits(robo, 18);
        },
        allowance: async(spender) => {
            const allowance = await roboErcContract.allowance(walletAddress, spender);
            return ethers.formatUnits(allowance, 18);
        },
        approve: async(spender, amount) => {
            const formatUnit = ethers.parseUnits(amount.toString(), 18)
            const tx = await roboErcContract.approve(spender, formatUnit)
            console.log(`approve processing .....`, tx.hash)
            await tx.wait();
            console.log(`approve done`)
            return tx.hash
        }
    }
}

async function Factory() {
    const provider = new ethers.JsonRpcProvider(RPC);
    const wallet = new ethers.Wallet(PrivKey, provider)

    const AbiErc20SolidityRobo = require("../core/artifacts/contracts/FACTORY.sol/RoboSwapFactory.json")

    const roboErcContract = new ethers.Contract(
        FACTORY.address,
        AbiErc20SolidityRobo.abi,
        wallet
    )

    return {
        createPair: async(base, quote) => {
            const check = await roboErcContract.getPair(base, quote);
            if (!check) {
                const pair = await roboErcContract.createPair(base, quote, {
                    gasPrice: ethers.parseUnits('3', 'gwei'),
                });
    
                await pair.wait();
                this.logger.debug(`transaction => ${pair.hash}`);
                const pairAddresses = await roboErcContract.getPair(base, quote);
        
                return pairAddresses;
            }

            return check
        },
        getPair: async (base, quote) => {
            const pairAddresses = await roboErcContract.getPair(base, quote);
            return pairAddresses;
        }
    }
}

async function router() {
    const provider = new ethers.JsonRpcProvider(RPC);
    const wallet = new ethers.Wallet(PrivKey, provider)

    const AbiErc20SolidityRobo = require("../core/artifacts/contracts/ROUTER.sol/RoboV2Router02.json")

    const roboErcContract = new ethers.Contract(
        ROUTER.address,
        AbiErc20SolidityRobo.abi,
        wallet
    )

    return {
        addLiquidity: async(tokenA, tokenB, desiredA, desiredB, minA, minB, to) => {
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            const futureTime = currentTime + 10 * 60;
            const generateDedline = `0x${futureTime.toString(16).toUpperCase()}`

            const tx = await roboErcContract.addLiquidity(
                tokenA, tokenB, desiredA, desiredB, minA, minB, to, generateDedline,
                {
                    gasPrice: ethers.parseUnits('3', 'gwei')
                }
            )

            console.log(`approve processing .....`, tx.hash)
            await tx.wait()
            console.log(`add liquidity success`)
            return tx.hash
        }
    }
}

async function facoryPairApprove(address) {
    const provider = new ethers.JsonRpcProvider(RPC);
    const wallet = new ethers.Wallet(PrivKey, provider)
    const walletAddress = await wallet.getAddress()
    const AbiErc20SolidityRobo = require("../core/artifacts/contracts/FACTORY.sol/IERC20.json")

    const roboErcContract = new ethers.Contract(
        address,
        AbiErc20SolidityRobo.abi,
        wallet
    )

    return {
        approve: async(spender, amount) => {
            const formatUnit = ethers.parseUnits(amount.toString(), 18)
            const tx = await roboErcContract.approve(spender, formatUnit, {
                gasPrice: ethers.parseUnits('3', 'gwei')
            })
            console.log(`approve processing factories .....`, tx.hash)
            await tx.wait();
            console.log(`approve done`)
            return tx.hash
        },
        allowance: async(spender) => {
            const allowance = await roboErcContract.allowance(walletAddress, spender);
            return ethers.formatUnits(allowance, 18);
        },
    }
}

async function liquidity() {
    const provider = new ethers.JsonRpcProvider(RPC);
    const wallet = new ethers.Wallet(PrivKey, provider)
    const walletAddress = await wallet.getAddress()

    const AbiErc20SolidityRobo = require("../core/artifacts/contracts/masterchef.sol/IERC20.json")
    const AbiRoboLiquidity = require("../core/artifacts/contracts/masterchef.sol/RoboLiquidity.json")

    const roboErcContract = new ethers.Contract(
        LIQUIDITY.address,
        AbiErc20SolidityRobo.abi,
        wallet
    )

    const roboContract = new ethers.Contract(
        LIQUIDITY.address,
        AbiRoboLiquidity.abi,
        wallet
    )

    return {
        approve: async(spender, amount) => {
            const formatUnit = ethers.parseUnits(amount.toString(), 18)
            const tx = await roboErcContract.approve(spender, formatUnit)
            console.log(`approve processing .....`, tx.hash)
            await tx.wait();
            console.log(`approve done`)
            return tx.hash
        },
        add: async(alpoint, lpToken) => {
            const tx = await roboContract.add(alpoint, lpToken, true, true, {
                gasPrice: ethers.parseUnits('3', 'gwei')
            })
            console.log(`processing for add new farm .... ${tx.hash}`)
            await tx.wait()
            console.log(`deploying new farm done`)
            return tx.hash
        },
        deposit: async(pid, amount) => {
            console.log(`Deposit processing`)
            const tx = await roboContract.deposit(pid, amount)
            console.log(`processing for lp => ${tx.hash}`)
            await tx.wait()
            console.log(`processing deposit is done ${tx.hash}`)
            return tx.hash
        },
        pendingRobo: async(pid) => {
            const tx = await roboContract.pendingRobo(pid, walletAddress)
            return tx
        },
        userInfo: async(pid) => {
            const tx = await roboContract.userInfo(pid,walletAddress)
            
            return {
                amount: tx[0].toString(),
                rewardDebt: tx[1].toString(),
                pendingRewards: tx[2].toString(),
              }
        },
        poolLength: async() => {
            const tx = await roboContract.poolLength()
            return tx
        }
    }
}

main()