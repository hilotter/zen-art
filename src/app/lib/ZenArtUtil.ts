import axios from 'axios';
import ZenArt from './ZenArt';
import config from '../config';

const getTokenUriById = async (tokenId) => {
  const tokenUri = await ZenArt.methods.tokenURI(tokenId).call();
  return tokenUri;
}

const getTokenIdByIndex = async (i) => {
  const tokenId = await ZenArt.methods.tokenByIndex(i).call();
  return tokenId;
}

const getTokenDetail = async (tokenId) => {
  let tokenUri;
  let res;
  try {
    tokenUri = await getTokenUriById(tokenId);
    res = await axios.get(tokenUri);
    if (res.status != 200) {
      return;
    }
  } catch (err) {
    console.log(err);
    return;
  }

  const name = res.data.name;
  const description = res.data.description;
  const image = res.data.image;
  const linkUrl = `${config.opensea_assets_url}${config.contract_address}/${tokenId}`;
  return {
    tokenId,
    tokenUri,
    name,
    description,
    image,
    linkUrl,
  };
}

export {
  getTokenIdByIndex,
  getTokenDetail,
};