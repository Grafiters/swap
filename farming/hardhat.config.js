require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    compilers: [
          {version: "0.4.18"},
          {version: "0.5.16"},
          {version: "0.6.12"},
          {
            version: "0.6.6",
            settings: {
              optimizer: {
                enabled: true,
                runs: 200
              }
            }
          },
          {version: "0.8.4"},
          {version: "0.8.12"}
      ]
  },
  networks: {
    spc: {
      url: "https://data-seed-prebsc-1-s3.bnbchain.org:8545",
      chainId: 97,
      gasPrice: 3000000000,
      accounts: ['9aca4cf105f87ee5ad3c972fcd24f464826e6e957b96944c46ae65a22ec72357']
    },
  }
};
