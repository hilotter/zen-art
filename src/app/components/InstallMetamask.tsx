import React from 'react';
import { Container, Header } from 'semantic-ui-react';

export default () => (
  <Container text>
    <Header as="h2">
      Please install Metamask or Trust Wallet
    </Header>
    <p>
      <a
        href="https://metamask.io/"
        target="_blank"
        rel="noreferrer noopener"
        title="Metamask is required to use the 0x Sandbox. Click to download."
      >
        <img
          src="https://github.com/MetaMask/faq/raw/master/images/download-metamask-dark.png"
          height="60px"
          alt="Download Metamask"
        />
      </a>
    </p>
    <p>
      <a href="https://itunes.apple.com/us/app/trust-ethereum-wallet/id1288339409">
        <img
          src="https://uploads-ssl.webflow.com/5a88babea6e0f90001b39b0d/5a8a2aec54ea7a0001465579_badge-download-on-the-app-store.svg"
          height="60px"
          alt="Download Trust"
        />
      </a>
      <a href="https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp">
        <img
          src="https://uploads-ssl.webflow.com/5a88babea6e0f90001b39b0d/5a8a2aa037147b0001ae259d_google_play.png"
          height="60px"
          alt="Download Trust"
        />
      </a>
    </p>
    <p>
      Once metamask or trust wallet is installed, please refresh this page
    </p>
  </Container>
);
