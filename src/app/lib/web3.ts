import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const infuraUrl = process.env.INFURA_URL;
  const provider = new Web3.providers.HttpProvider(infuraUrl);
  web3 = new Web3(provider);
}

// refs: https://gist.github.com/xavierlepretre/88682e871f4ad07be4534ae560692ee6
web3.eth.getTransactionReceiptMined = require('./getTransactionReceiptMined');

export default web3;
