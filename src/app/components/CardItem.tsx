import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import IItem from '../interface/IItem';

export default (props: IItem) => (
  <Card>
    {(() => {
      if (props.internalLink) {
        return(
          <a href={props.linkUrl}>
            <Image src={props.image} centered />
          </a>
        );
      } else {
        return(
          <a
            href={props.linkUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Image src={props.image} centered />
          </a>
        );
      }
    })()}
    <Card.Content>
      <Card.Header>{props.name}</Card.Header>
      <Card.Description>{props.description}</Card.Description>
    </Card.Content>
  </Card>
);
