import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import { withRouter } from 'next/router'
import web3 from '../lib/web3';
import LayoutComponent from '../components/Layout';
import InstallMetamask from '../components/InstallMetamask';
import config from '../config';

class Layout extends Component {
  state = {
    metamaskInstalled: true,
    validNetworkId: true,
    networkName: '',
    ssrPage: true,
  }

  async componentDidMount() {
    if (this.props.router.route === '/publish') {
      this.setState({ ssrPage: false });
    }

    if (!window.web3) {
      this.setState({ metamaskInstalled: false });
    }

    try {
      const networkId = await web3.eth.net.getId();
      if (networkId !== config.network_id) {
        this.setState({ validNetworkId: false });
      }
    } catch(err) {
      //console.log(err);
      this.setState({ validNetworkId: false });
    }

    let networkName;
    switch (config.network_id) {
      case 1:
        networkName = 'mainnet';
        break
      case 4:
        networkName = 'rinkeby';
        break
      default:
        networkName = 'local';
    }
    this.setState({ networkName });
  }

  render() {
    if (this.state.metamaskInstalled || this.state.ssrPage) {
      return (
        <LayoutComponent networkName={this.state.networkName}>
          <Message error hidden={this.state.validNetworkId || this.state.ssrPage} header="Oops!" content={`you're on the wrong network. open your wallet and switch over to the "${this.state.networkName}" network.`} />
          {this.props.children}
        </LayoutComponent>
      );
    } else {
      return (
        <LayoutComponent networkName={this.state.networkName}>
          <InstallMetamask />
        </LayoutComponent>
      );
    }
  }
}

export default withRouter(Layout);
