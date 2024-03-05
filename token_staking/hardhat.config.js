require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    compilers: [
          {version: "0.8.17"}
      ]
  },
  networks: {
    dev: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      chainId: 1503,
      gasPrice: 300000000,
      accounts: ['5c0cc4e229a9a1dd1a79441ad7b4c95608e68ffba885da50922c5f1dc96d713c']
    }
  }
};
