import ipfsAPI from 'ipfs-api';
import config from '../config';

const ipfs = new ipfsAPI({ host: config.ipfs.host, port: config.ipfs.port, protocol: config.ipfs.protocol });

export default ipfs;
