import React, { Component } from 'react';
import {
  Container,
  Card,
  Dimmer,
  Loader,
  Header,
} from 'semantic-ui-react';
import Error from 'next/error';
import { withRouter } from 'next/router';
import Layout from '../containers/Layout';
import { getTokenDetail } from '../lib/ZenArtUtil';
import CardItem from '../components/CardItem';

class ZenArtDetail extends Component {
  constructor () {
    super();
    this.state = {
      notFound: false,
      pageLoading: true,
      tokenId: null,
      tokenUri: null,
      name: null,
      description: null,
      image: null,
    };
  }

  async componentDidMount() {
    const { router } = this.props;
    const tokenId = router.query.tokenId;
    const tokenDetail = await getTokenDetail(tokenId);
    if (!tokenDetail) {
      this.setState({ notFound: true });
    }
    this.setState({ pageLoading: false, ...tokenDetail });
  }

  getContent = () => {
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
            {this.state.name}
            <Header.Subheader>
              {this.state.description}
            </Header.Subheader>
          </Header>

          <Card.Group centered>
            <CardItem
              tokenId={this.state.tokenId}
              tokenUri={this.state.tokenUri}
              name={this.state.name}
              description={this.state.description}
              image={this.state.image}
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

export default withRouter(ZenArtDetail);
