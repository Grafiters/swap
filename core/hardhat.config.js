require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: {
    compilers: [
      { version: '0.4.18' },
      { version: '0.5.16' },
      { version: '0.6.12' },
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      { version: '0.8.4' },
      { version: '0.8.12' }
    ]
  },
  networks: {
    dev: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      chainId: 1503,
      gasPrice: 3000000000,
      accounts: ['51764b77a9ab1c4ceab34a21905a735b869dc1818c223ee734852192a80adc56']
    },
    spc: {
      url: "https://data-seed-prebsc-1-s3.bnbchain.org:8545",
      chainId: 97,
      gasPrice: 3000000000,
      accounts: ['9aca4cf105f87ee5ad3c972fcd24f464826e6e957b96944c46ae65a22ec72357']
    },
    spc_test: {
      url: "https://rpctest.spectachain.io",
      chainId: 1503,
      gasPrice: 3000000000,
      accounts: ['662d489e4a3962b6b0ff446ceea9612b322adbfa33f32349982129e9b3dad2eb']
    },
    ganache: {
      url: "http://localhost:7545",
      chainId: 1377,
      gasPrice: 3000000000,
      accounts: ['662d489e4a3962b6b0ff446ceea9612b322adbfa33f32349982129e9b3dad2eb']
    }
  }
};
// 0x5921D07D07DeC2aFFaB5468BB7216643dc175A66