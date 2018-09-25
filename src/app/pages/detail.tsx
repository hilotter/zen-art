import React, { Component } from 'react';
import {
  Container,
  Card,
  Dimmer,
  Loader,
  Header,
} from 'semantic-ui-react';
import Error from 'next/error';
import Layout from '../containers/Layout';
import { getTokenDetail } from '../lib/ZenArtUtil';
import CardItem from '../components/CardItem';

class ZenArtDetail extends Component {
  static async getInitialProps({ req }) {
    const match = req.url.match(/detail\/(\d+)/);
    const tokenId = match[1];
    const tokenDetail = await getTokenDetail(tokenId);
    return { token: tokenDetail };
  }

  constructor () {
    super();
    this.state = {
      notFound: false,
      pageLoading: true,
    };
  }

  async componentDidMount() {
    if (!this.props.token) {
      this.setState({ notFound: true });
    }
    this.setState({ pageLoading: false });
  }

  getContent = () => {
    const token = this.props.token;
    if (this.state.pageLoading) {
      return(
        <Dimmer active inverted>
          <Loader inverted content='Loading' />
        </Dimmer>
      );
    } else {
      return (
        <Container>
          <Header as='h2' textAlign='center'>
            {token.name}
            <Header.Subheader>
              {token.description}
            </Header.Subheader>
          </Header>

          <Card.Group centered>
            <CardItem
              tokenId={token.tokenId}
              tokenUri={token.tokenUri}
              name={token.name}
              description={token.description}
              image={token.image}
              linkUrl={token.linkUrl}
            />
          </Card.Group>
        </Container>
      );
    }
  }

  render () {
    if(this.state.notFound) {
      return <Error statusCode={404} />
    } else {
      return (
        <Layout>
          {this.getContent()}
        </Layout>
      );
    }
  }
}

export default ZenArtDetail;
