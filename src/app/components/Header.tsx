import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import Link from 'next/link';
import config from '../config';

export default props => (
  <Menu style={{ marginTop: '10px' }}>
    <a className="item" href="/">
      <Header as="h4">
        <Header.Content>
          ZenArt β
        </Header.Content>
      </Header>
    </a>
    <Menu.Item>
      <p>
        {props.networkName}
      </p>
    </Menu.Item>

    <Menu.Menu position="right">
      <a
        href={config.opensea_url}
        target="_blank"
        rel="noreferrer noopener"
      >
        <Menu.Item link>
          <p>
            Marketplace
          </p>
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
