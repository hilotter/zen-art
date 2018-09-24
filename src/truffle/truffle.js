/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

require('babel-register');
require('babel-polyfill');

const HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = process.env.HDWALLET_MNEMONIC;
const infuraUrl = process.env.INFURA_URL;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
    },
    rinkeby: {
      provider() {
        return new HDWalletProvider(
          mnemonic,
          infuraUrl,
        );
      },
      network_id: 4,
      gas: 4600000,
    },
    mainnet: {
      provider() {
        return new HDWalletProvider(
          mnemonic,
          infuraUrl,
          3
        );
      },
      network_id: 1,
      gas: 4600000,
      gasPrice: 6000000000,
    },
  },
};
