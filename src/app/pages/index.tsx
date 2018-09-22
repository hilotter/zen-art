import React, { Component } from 'react';
import {
  Container,
  Form,
  Input,
  Button,
  Label,
  Loader,
  Icon,
  Dimmer,
  Message,
} from 'semantic-ui-react';
import Head from 'next/head';
import ipfs from '../lib/ipfs';
import web3 from '../lib/web3';
import Syodo from '../lib/syodo';
import config from '../config';

class SyodoIndex extends Component {
  constructor () {
    super();
    this.state = {
      tokenId: '',
    };
  }

  ipfsUrl = (hash) => {
    return `${config.ipfs.gateway_url}${hash}`;
  }

  checkTokenId = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const syodo = await Syodo.methods
        .tokenOfOwnerByIndex(accounts[0], this.state.tokenId)
        .call();
      console.log(syodo);
      const tokenUri = await Syodo.methods
        .tokenURI(syodo)
        .call();
      console.log(tokenUri);
    } catch (err) {
      console.error(err);
    }
  }

  getContent = () => {
    return (
      <Container>
        <Form onSubmit={this.checkTokenId}>
          <Form.Field>
            <Input
              placeholder="tokenId"
              value={this.state.tokenId}
              onChange={event => this.setState({ tokenId: event.target.value})}
              type="text"
            />
          </Form.Field>
          <Button
            loading={this.state.loading}
            disabled={this.state.loading}
            content="Check"
            icon="send"
            primary
          />
        </Form>
      </Container>
    )
  }

  render () {
    return (
      <Container text>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css" />
        </Head>

        {this.getContent()}
      </Container>
    );
  }
}

export default SyodoIndex;
