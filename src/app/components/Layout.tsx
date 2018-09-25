import React from 'react';
import { Container, Divider } from 'semantic-ui-react';
import Header from './Header';
import Footer from './Footer';

export default props => (
  <Container>
    <Header networkName={props.networkName} />
    {props.children}
    <Divider hidden clearing />
    <Footer />
  </Container>
);
