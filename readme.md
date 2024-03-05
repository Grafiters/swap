1. ✅ token
2. ✅ core
3. ✅ subgraph = change network sesuai dengan graph ( ethereum: 'spc:<http://node:8545>')
4. ✅ build graph blocks
5. build graph cake-pool
6. ✅ build graph exchange , change pricing.ts address
7. build graph exchange-cake-pairs
8. build graph exchange-stableswap
9. build graph farm-auctions
10. build graph lottery
11. build graph masterchef-v2
12. build graph nft-market
13. build graph pairs
14. build graph pancake-squad
15. build graph pottery
16. build graph prediction
17. build graph profile
18. build graph smartchef
19. build graph timelock
20. build graph trading-competition


❯ npx hardhat run scripts/deploy.js --network spc_test
WARNING: You are using a version of Node.js that is not supported, and it may work incorrectly, or not work at all. See https://hardhat.org/nodejs-versions


Compiled 8 Solidity files successfully
Deploying the contracts with the account: 0x98B71651Ccd4069d461B700b663afDf17A7749FF
Account balance: 5000000000000000000
WBTC address: 0x18437ca9e8519390b9844f83516A490ce605b456
Exported deployments into /home/ahsan_dev/kerja/nusatech/specta/swap_contract_creator/deployments/1503/WBTC.json
WETH address: 0x85AeEaFEF9fAfDEca2189c3B8890744C3514b477
Exported deployments into /home/ahsan_dev/kerja/nusatech/specta/swap_contract_creator/deployments/1503/WETH.json
WSPC address: 0x41a17E9eA3b18d6A5222Cd7A195810eFCe4966f4
Exported deployments into /home/ahsan_dev/kerja/nusatech/specta/swap_contract_creator/deployments/1503/WSPC.json
SUSD address: 0xf615c0BDA62568790801e916BB9694f2a46956C7
Exported deployments into /home/ahsan_dev/kerja/nusatech/specta/swap_contract_creator/deployments/1503/SUSD.json
CITY address: 0x9e5A48A6609c4306f0A96E59C94510CE0F3C8d46
Exported deployments into /home/ahsan_dev/kerja/nusatech/specta/swap_contract_creator/deployments/1503/CITY.json
SpcNFT address: 0x43D44DcCe283d663eBA9b7b192c19eB479BAb63b
Exported deployments into /home/ahsan_dev/kerja/nusatech/specta/swap_contract_creator/deployments/1503/SpcNFT.json
DAIToken address: 0x485F0FB6BbF4C9891172C932644609da920e944E
Exported deployments into /home/ahsan_dev/kerja/nusatech/specta/swap_contract_creator/deployments/1503/DAI.json
USDTToken address: 0x66fed99282eCE587B3258D78C76a4EA06e782C5f
Exported deployments into /home/ahsan_dev/kerja/nusatech/specta/swap_contract_creator/deployments/1503/USDT.json
❯ cd ..
❯ cd core
❯ npx hardhat run scripts/deploy.js --network spc_test
Compiled 5 Solidity files successfully (evm targets: istanbul, london).
Deploying the contracts with the account: 0x98B71651Ccd4069d461B700b663afDf17A7749FF
Account balance: 4967991146000000000
SpcSwapFactory address: 0x5d652AEcd41DC22C1537e73aBbf6a416d52BbFD0
Exported deployments into /home/ahsan_dev/kerja/nusatech/specta/swap_contract_creator/deployments/1503/SpcSwapFactory.json
init_code_pair_hash: 0x8aa159a93a2666b68f4b61e6707223b90370163dd24dd6a27ae42b1402f19154
Exported deployments into /home/ahsan_dev/kerja/nusatech/specta/swap_contract_creator/deployments/1503/INIT_CODE_PAIR_HASH.json
Multicall3 address: 0x1ADe44aE066A7096149736369fF47214165cD0ab
Exported deployments into /home/ahsan_dev/kerja/nusatech/specta/swap_contract_creator/deployments/1503/Multicall3.json
Exported deployments into /home/ahsan_dev/kerja/nusatech/specta/swap_contract_creator/deployments/1503/SpcV2Router02.json
SpcV2Router02 address: 0x824c02592497e5F94bb82594b672fab8619834a0
SpcLiquidity address: 0x23e1F3b13c48E19d54432e1dD43A723785DD228a
Exported deployments into /home/ahsan_dev/kerja/nusatech/specta/swap_contract_creator/deployments/1503/SpcLiquidity.json
TokenLockFactory address: 0x9b9299560C463BAcB881ae1361703B9D1Ad66A1C
Exported deployments into /home/ahsan_dev/kerja/nusatech/specta/swap_contract_creator/deployments/1503/TokenLockFactory.json
SPC-SUSD LP addresss: 0x493D2681362F60545DB0A4F17540023689E66fC4
Exported deployments into /home/ahsan_dev/kerja/nusatech/specta/swap_contract_creator/deployments/1503/SPC_SUSD_PairAddress.json
CITY-SPC LP addresss: 0x8F2940cc72587784F21c7221c39F2A2840cEDd6E
Exported deployments into /home/ahsan_dev/kerja/nusatech/specta/swap_contract_creator/deployments/1503/CITY_SPC_PairAddress.json