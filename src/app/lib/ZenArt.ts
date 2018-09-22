import web3 from './web3';
import config from '../config';
import ZenArt from '../../truffle/build/contracts/ZenArt.json';

const instance = new web3.eth.Contract(ZenArt.abi, config.contract_address);

export default instance;
