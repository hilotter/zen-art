import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import IItem from '../interface/IItem';
import config from '../config';

export default (props: IItem) => (
  <Card>
    <a
      href={`${config.opensea_assets_url}${config.contract_address}/${props.tokenId}`}
      target="_blank"
      rel="noreferrer noopener"
    >
      <Image src={props.image} centered />
    </a>
    <Card.Content>
      <Card.Header>{props.name}</Card.Header>
      <Card.Description>{props.description}</Card.Description>
    </Card.Content>
  </Card>
);
