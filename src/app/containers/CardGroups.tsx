import React, { Component } from 'react';
import ZenArt from '../lib/ZenArt';
import { getTokenIdByIndex, getTokenDetail } from '../lib/ZenArtUtil';
import CardGroupsComponent from '../components/CardGroups';

class CardGroups extends Component {
  state = {
    recentlyListedItems: [],
  }

  componentDidMount() {
    this.getRecentListedItems();
  }

  getRecentListedItems = async () => {
    let recentlyListedItems = [];
    const totalSupply = await ZenArt.methods.totalSupply().call();
    for (let i = totalSupply - 1; i >= 0; i--) {
      let tokenId = await getTokenIdByIndex(i);
      let tokenDetail = await getTokenDetail(tokenId);
      if (!tokenDetail) {
        continue;
      }
      recentlyListedItems.push(tokenDetail);
      if (recentlyListedItems.length >= 24) {
        break;
      }
    }

    this.setState({ recentlyListedItems });
  }

  render() {
    return <CardGroupsComponent items={this.state.recentlyListedItems} />
  }
}

export default CardGroups;