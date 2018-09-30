import React, { Component } from 'react';
import {
  Container,
  Header,
  Button,
  Image,
} from 'semantic-ui-react';
import Head from '../components/Head';
import Layout from '../containers/Layout';

class ZenArtAbout extends Component {
  render () {
    return (
      <Layout>
        <Head />
        <Container text>
          <Header as="h4" textAlign='center'>
            Welcome to ZenArt
          </Header>
          <p>You can publish your zen art on IPFS as Ethereum ERC721 token.</p>
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

          <Header as="h4" textAlign='center'>
            Media
          </Header>
          <Container textAlign='center'>
            <p>
              <a
                href='https://www.stateofthedapps.com/dapps/zenart'
                target="_blank"
                rel="noreferrer noopener"
              >
                <Image height='30px' src='/static/img/partner/state_of_the_dapps.png' centered />
              </a>
            </p>
          </Container>
        </Container>
      </Layout>
    );
  }
}

export default ZenArtAbout;

