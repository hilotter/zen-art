import axios from 'axios';
import ZenArt from './ZenArt';

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

  let name = res.data.name;
  let description = res.data.description;
  let image = res.data.image;
  return {
    tokenId,
    tokenUri,
    name,
    description,
    image,
  };
}

export {
  getTokenIdByIndex,
  getTokenDetail,
};