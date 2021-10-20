require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
const fs = require('fs');

const privateKeyMatic = fs.readFileSync('.matic-wallet-secret').toString();
const privateKeyEthRopsten = fs.readFileSync('.eth-wallet-secret').toString();
const infuraId = fs.readFileSync('.infuraid').toString();

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${infuraId}`,
      accounts: [privateKeyEthRopsten]
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${infuraId}`,
      accounts: [privateKeyMatic],
    },
    matic: {
      url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      accounts: [privateKeyMatic],
    },
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
