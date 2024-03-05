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
    dev: {
      url: "https://rpc-mumbai.maticvigil.com",
      chainId: 1503,
      gasPrice: 3000000000,
      accounts: ['51764b77a9ab1c4ceab34a21905a735b869dc1818c223ee734852192a80adc56']
    }
  }
};
