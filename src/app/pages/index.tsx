import React, { Component } from 'react';
import {
  Header,
  Image,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import Layout from '../containers/Layout';
import CardGroups from '../containers/CardGroups';

class ZenArtIndex extends Component {
  constructor () {
    super();
    this.state = {
      pageLoading: true,
    };
  }

  async componentDidMount() {
    this.setState({ pageLoading: false });
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
        <div>
          <Image src="/static/img/header_photo.png" size='huge' centered />

          <Header as='h2' textAlign='center'>
            <Header.Content>
              Showcase digital Zen artwork & collectables
            </Header.Content>
          </Header>

          <Header as='h2' textAlign='center'>
            <Header.Content>
              Recently Listed
            </Header.Content>
          </Header>
          <CardGroups />
        </div>
      )
    }
  }

  render () {
    return (
      <Layout>
        {this.getContent()}
      </Layout>
    );
  }
}

export default ZenArtIndex;
