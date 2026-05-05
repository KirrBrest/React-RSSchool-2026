import { Component } from 'react';
import type { CardProps } from '../types';
import './Card.css';

export class Card extends Component<CardProps> {
  render() {
    const { name, description } = this.props;
    return (
      <article className="result-card">
        <h3 className="result-card__name">{name}</h3>
        <p className="result-card__description">{description}</p>
      </article>
    );
  }
}
