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
    contract_address: '0xce1ddc9562f00365d25d02af2a25fa3d5b8575e8',
    network_id: 1537549428535,
  },
  staging: {
    ipfs: {
      host: 'ipfs.infura.io',
      protocol: 'https',
      port: 5001,
      gateway_url: 'https://ipfs.infura.io/ipfs/',
    },
    site_url: 'https://rinkeby.zen-art.app',
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
    site_url: 'https://zen-art.app',
    etherscan_url: 'https://etherscan.io',
    contract_address: '',
    network_id: 1,
  },
}[env];

export default configs;
