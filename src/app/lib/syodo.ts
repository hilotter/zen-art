import web3 from './web3';
import config from '../config';
import Syodo from '../../truffle/build/contracts/Syodo.json';

const instance = new web3.eth.Contract(Syodo.abi, config.contract_address);

export default instance;
