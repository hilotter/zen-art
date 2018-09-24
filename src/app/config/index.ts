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
    contract_address: '0x51b7400da873249f18b3e3813cb48a1073753345',
    network_id: 1111,
    opensea_assets_url: 'https://rinkeby.opensea.io/assets/',
    opensea_url: 'https://rinkeby.opensea.io/category/zenart',
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
  },
}[env];

export default configs;
