import React from 'react';
import { Container, Divider } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default props => (
  <Container>
    <Head>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css" />
    </Head>
    <Header networkName={props.networkName} />
    {props.children}
    <Divider hidden clearing />
    <Footer />
  </Container>
);
