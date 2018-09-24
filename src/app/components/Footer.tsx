import React from 'react';
import { Container, Divider, Icon } from 'semantic-ui-react';

export default () => (
  <Container textAlign="center">
    <Divider />
    <footer>
      <p>
        Contact
      </p>
      <p>
        <a
          href="https://twitter.com/zenart_chain"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Icon name='twitter' size='big' color='black' />
        </a>
      </p>
      <p>
          copyrights 2018 ZenArt All RIghts Reserved.
      </p>
    </footer>
  </Container>
);
