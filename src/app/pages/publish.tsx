import React, { Component } from 'react';
import {
  Container,
  Form,
  Input,
  Button,
  Label,
  Icon,
  Message,
  Loader,
} from 'semantic-ui-react';
import Link from 'next/link';
import Layout from '../containers/Layout';
import Head from '../components/Head';
import ipfs from '../lib/ipfs';
import web3 from '../lib/web3';
import ZenArt from '../lib/ZenArt';
import config from '../config';

class ZenArtPublish extends Component {
  constructor () {
    super();
    this.state = {
      loading: false,
      uploading: false,
      name: '',
      description: '',
      added_file_hash: null,
      added_data_hash: null,
      tokenId: '',
      errorMessage: '',
      successMessage: '',
    };
  }

  captureFile = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    this.setState({ uploading: true });

    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.onloadend = () => {
      this.saveFileToIpfs(reader.result, "added_file_hash");
      this.setState({ uploading: false });
    };
    reader.readAsArrayBuffer(file);
  }

  saveFileToIpfs = async (data, stateKey) => {
    const buffer = Buffer.from(data);
    
    try {
      const response = await ipfs.add(buffer);
      const ipfsId = response[0].hash;
      this.setState({ [stateKey]: ipfsId });
    } catch(err) {
      console.error(err);
    }
  }

  ipfsUrl = (hash) => {
    return `${config.ipfs.gateway_url}${hash}`;
  }

  createZenArt = async () => {
    const name = this.state.name;
    const description = this.state.description;

    if (this.state.name === '') {
      this.setState({ loading: false, errorMessage: "require name" });
      return;
    }

    if (this.state.added_file_hash === null) {
      this.setState({ loading: false, errorMessage: "require image" });
      return;
    }

    await this.saveFileToIpfs(JSON.stringify({
      name,
      description,
      image: this.ipfsUrl(this.state.added_file_hash),
    }), "added_data_hash");

    if (this.state.added_data_hash === null) {
      this.setState({ loading: false, errorMessage: "ipfs upload error" });
      return;
    }

    // Modern dapp browsers
    if (window.ethereum) {
      try {
        await ethereum.enable();
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
    }

    try {
      const accounts = await web3.eth.getAccounts();
      const fee = await ZenArt.methods.getPaperFee().call();
      const txReceipt = await ZenArt.methods
          .mintPaper(this.state.added_file_hash, this.ipfsUrl(this.state.added_data_hash))
          .send({
              from: accounts[0],
              value: fee,
          })
          .on('transactionHash');
      this.setState({ successMessage: `Published your zen art!` });
    } catch (err) {
      console.error(err);
      this.setState({ errorMessage: err.message });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({ loading: true, errorMessage: '', successMessage: '' });
    await this.createZenArt();
    this.setState({ loading: false });
  }

  getContent = () => {
    return (
      <Container>
        <p>Let's upload your original Zen Art.</p>
        <Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage} success={!!this.state.successMessage}>
          <Form.Field>
            <Input
              placeholder="zen art name"
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
              type="text"
            />
          </Form.Field>
          <Form.Field>
            <Input
              placeholder="zen art description"
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
              type="text"
            />
          </Form.Field>

          <Label width="4" as="label" htmlFor="file" size="big">
            <Icon name="file" />
            Image
          </Label>
          <input id="file" hidden type="file" accept="image/*" onChange={this.captureFile} />
          <Loader active={this.state.uploading} inline />
          <p>
            <img
              src={this.state.added_file_hash ? this.ipfsUrl(this.state.added_file_hash) : null}
              style={{ "display": (this.state.added_file_hash ? "block" : "none"), "maxHeight": "500px" }}
            />
          </p>

          <Button
            loading={this.state.loading}
            disabled={this.state.loading}
            content="Publish Zen Art"
            icon="paint brush"
            secondary
          />

          <Message error header="Oops!" content={this.state.errorMessage} /> 
          <Message success>
            <Message.Header>Success!</Message.Header>
            <p>{this.state.successMessage}</p>
            <p>Your transaction is mining now. Please wait a little while more.</p>
            <p>
              <Link href="/">
                <a>after that please check top page</a>
              </Link>
            </p>
          </Message>
        </Form>

        <ul>
          <li>
            What is Zen Art ?
            <ul>
              <li>Japanese calligraphy</li>
              <li>Literati painting</li>
            </ul>
          </li>
          <li>
            How can I create Zen Art ?
            <ul>
              <li>We recommend <a href="http://psoftmobile.net/en/zenbrush.html" target="_blank" rel="noreferrer noopener">Zen Brush</a> App if you use iOS.</li>
              <li>We are finding Android App for Zen Art. Please tell me if you have good app.</li>
            </ul>
          </li>
          <li>
            Note
            <ul>
              <li>Published Zen Art cannot be deleted.</li>
              <li>Please do not upload ilegal contents.</li>
              <li>This service assumes no responsibility.</li>
            </ul>
          </li>
        </ul>
      </Container>
    )
  }

  render () {
    return (
      <Layout>
        <Head />
        {this.getContent()}
      </Layout>
    );
  }
}

export default ZenArtPublish;
