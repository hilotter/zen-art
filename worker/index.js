const axios = require('axios');
const Web3 = require('web3');
const ZenArt = require('../src/truffle/build/contracts/ZenArt.json');

const PURGE_URL = 'https://zen-art.app';

// https://github.com/ethereum/web3.js/issues/1354
class EventWorker {
  constructor () {
    this.web3 = new Web3(this.getProvider());
    this.contractInstance = new this.web3.eth.Contract(ZenArt.abi, process.env.CONTRACT_ADDRESS);
  }

  getProvider () {
    const provider = new Web3.providers.WebsocketProvider(process.env.INFURA_WS_URL);
    provider.on('connect', () => console.log('WS Connected'));
    return provider;
  }

  watchEvents () {
    this.contractInstance.events.Transfer()
      .on('data', (evt) => this._processEvent(evt))
      .on('error', (evt) => console.error(evt));

    this.isWatchingEvents = true

    this.web3._provider.on('error', (e) => {
        console.error('WS Error');
        this.web3.setProvider(this.getProvider());

        this.isWatchingEvents = false;
        this.restartWatchEvents();
      })
    this.web3._provider.on('end', (e) => {
        console.error('WS End');
        this.web3.setProvider(this.getProvider());

        this.isWatchingEvents = false;
        this.restartWatchEvents();
      })
  }

  restartWatchEvents () {
    if (this.isWatchingEvents) return;

    if (this.web3._provider.connected) {
      this.watchEvents();
    } else {
      console.log(new Date());
      console.log('Delay restartWatchEvents');
      setTimeout(this.restartWatchEvents.bind(this), 60 * 1000);
    }
  }

  async _processEvent (event) {
    console.log(event);
    if (event.returnValues.from === '0x0000000000000000000000000000000000000000') {
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
  }
}

new EventWorker().watchEvents();
