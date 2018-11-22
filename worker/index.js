const axios = require('axios');
const Web3 = require('web3');
const ZenArt = require('../src/truffle/build/contracts/ZenArt.json');

const PURGE_URL = 'https://zen-art.app';
const wsProvider = new Web3.providers.WebsocketProvider(process.env.INFURA_WS_URL);
const web3 = new Web3(wsProvider);

const instance = new web3.eth.Contract(ZenArt.abi, process.env.CONTRACT_ADDRESS);

const event = instance.events.Transfer();
event.on('data', async (event) => {
  if (event.returnValues.from === '0x0000000000000000000000000000000000000000') {
    console.log(event);
    try {
      const res = await axios({
        url: PURGE_URL,
        method: 'PURGE',
      });
      console.log(res.data);
    } catch(error) {
      console.log(error);
    }
  }
});
event.on('changed', (event) => {
  console.log("changed", event);
});
event.on('error', (error) => {
  console.log("error", error);
});
