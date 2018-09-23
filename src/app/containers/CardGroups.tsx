import React, { Component } from 'react';
import axios from 'axios';
import ZenArt from '../lib/ZenArt';
import CardGroupsComponent from '../components/CardGroups';

class CardGroups extends Component {
  state = {
    recentlyListedItems: [],
  }

  componentDidMount() {
    this.getRecentListedItems();
  }

  getTokenIdByIndex = async (i) => {
    const tokenId = await ZenArt.methods.tokenByIndex(i).call();
    return tokenId;
  }

  getTokenUriById = async (tokenId) => {
    const tokenUri = await ZenArt.methods.tokenURI(tokenId).call();
    return tokenUri;
  }

  getRecentListedItems = async () => {
    let recentlyListedItems = [];
    try {
      const totalSupply = await ZenArt.methods.totalSupply().call();
      for (let i = totalSupply - 1; i >= 0; i--) {
        let tokenId = await this.getTokenIdByIndex(i);
        let tokenUri = await this.getTokenUriById(tokenId);

        let res = await axios.get(tokenUri);
        if (res.status != 200) {
          continue;
        }

        let name = res.data.name;
        let description = res.data.description;
        let image = res.data.image;
        recentlyListedItems.push({
          tokenId,
          tokenUri,
          name,
          description,
          image,
        });
        if (recentlyListedItems.length >= 6) {
          break;
        }
      }
    } catch (err) {
      console.log(err);
    }

    this.setState({ recentlyListedItems });
  }

  render() {
    return <CardGroupsComponent items={this.state.recentlyListedItems} />
  }
}

export default CardGroups;