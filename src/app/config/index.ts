const env = process.env.ENV || 'development';

const configs = {
  development: {
    ipfs: {
      host: 'localhost',
      protocol: 'http',
      port: 5001,
      gateway_url: 'http://localhost:8080/ipfs/',
    },
    site_url: 'http://localhost:3000',
    etherscan_url: 'https://rinkeby.etherscan.io',
    contract_address: '0xfe8a2f2c8bfb03f95bf781767cc8ca0f56c873da',
    network_id: 1537549428535,
  },
  staging: {
    ipfs: {
      host: 'ipfs.infura.io',
      protocol: 'https',
      port: 5001,
      gateway_url: 'https://ipfs.infura.io/ipfs/',
    },
    site_url: 'https://rinkeby.dsyodo.app',
    etherscan_url: 'https://rinkeby.etherscan.io',
    contract_address: '',
    network_id: 4,
  },
  production: {
    ipfs: {
      host: 'ipfs.infura.io',
      protocol: 'https',
      port: 5001,
      gateway_url: 'https://ipfs.infura.io/ipfs/',
    },
    site_url: 'https://dsyodo.app',
    etherscan_url: 'https://etherscan.io',
    contract_address: '',
    network_id: 1,
  },
}[env];

export default configs;
