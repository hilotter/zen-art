import React, { Component } from 'react';
import {
  Container,
  Header,
  Button,
  Image,
} from 'semantic-ui-react';
import Head from '../components/Head';
import Layout from '../containers/Layout';

class ZenArtPrivacy extends Component {
  render () {
    return (
      <Layout>
        <Head />
        <Container text>
          <Header as="h4" textAlign='center'>
            Privacy Policy
          </Header>
          <p>
            On this site, we use "Google Analytics" access analysis tool by Google. This Google Analytics uses cookies to collect traffic data. This tracking data is collected anonymously, it does not identify individuals.
          </p>
          <p>
            Since this function can refuse collecting by invalidating cookie, please confirm the setting of your browser. For details on this policy, please <a href="https://www.google.com/analytics/terms/us.html" target="_blank" rel="noreferrer noopener">click here</a>.
          </p>
        </Container>
      </Layout>
    );
  }
}

export default ZenArtPrivacy;

