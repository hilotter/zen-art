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
    contract_address: '0x24b1fc41ee84d4d858ff029b2add3e89401b95ea',
    network_id: 1111,
    opensea_assets_url: 'https://rinkeby.opensea.io/assets/',
    opensea_url: 'https://rinkeby.opensea.io/category/zenart',
    infura_url: 'http://localhost:8545',
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
    contract_address: '0xc21f729684e62df7ba860d88aa0e702308a5d18e',
    network_id: 4,
    opensea_assets_url: 'https://rinkeby.opensea.io/assets/',
    opensea_url: 'https://rinkeby.opensea.io/category/zenartv4',
    infura_url: 'https://rinkeby.infura.io/v3/a9a2a79a18fd4305823eb196b8b88f65',
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
    contract_address: '0x40b41a2d4c5fb2da3e08b0a1bbd361b5dd1f7bdd',
    network_id: 1,
    opensea_assets_url: 'https://opensea.io/assets/',
    opensea_url: 'https://opensea.io/category/zenart',
    infura_url: 'https://mainnet.infura.io/v3/a9a2a79a18fd4305823eb196b8b88f65',
  },
}[env];

export default configs;
