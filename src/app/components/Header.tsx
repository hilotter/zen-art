import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import Link from 'next/link';

export default props => (
  <Menu style={{ marginTop: '10px' }}>
    <Link href="/">
      <a className="item">
        <Header as="h4">
          <Header.Content>
            ZenArt β
          </Header.Content>
        </Header>
      </a>
    </Link>

    <Menu.Menu position="right">
      <Menu.Item>
        <p>
          {props.networkName}
        </p>
      </Menu.Item>

      <Link href="/publish">
        <Menu.Item>
            publish
        </Menu.Item>
      </Link>
    </Menu.Menu>
  </Menu>
);
