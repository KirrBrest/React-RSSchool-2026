import { Component } from 'react';
import { Card } from './Card';
import type { CardListProps } from '../types';
import './CardList.css';

export class CardList extends Component<CardListProps> {
  render() {
    const { items } = this.props;
    return (
      <ul className="card-list" aria-label="Search results">
        {items.map((item) => (
          <li key={item.id} className="card-list__item">
            <Card name={item.name} description={item.description} />
          </li>
        ))}
      </ul>
    );
  }
}
