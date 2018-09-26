import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import Link from 'next/link';
import config from '../config';

export default props => (
  <Menu style={{ marginTop: '10px' }}>
    <a className="item" href="/">
      <Header as="h4" textAlign='center'>
        ZenArt β
      </Header>
    </a>

    <Menu.Menu position="right">
      <a
        href={config.opensea_url}
        target="_blank"
        rel="noreferrer noopener"
      >
        <Menu.Item link>
          Marketplace
        </Menu.Item>
      </a>

      <Link href="/publish">
        <Menu.Item link>
          publish
        </Menu.Item>
      </Link>
    </Menu.Menu>
  </Menu>
);
