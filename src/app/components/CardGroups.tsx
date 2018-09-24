import React from 'react';
import { Card } from 'semantic-ui-react';
import CardItem from './CardItem';
import IItems from '../interface/IItems';

export default (props: IItems) => (
  <Card.Group centered>
    {props.items.map((item, i) => {
      return (
        <CardItem key={i} {...item} />
      );
    })}
  </Card.Group>
);
