import { Component } from 'react';
import './Card.css';

export type CardProps = {
  name: string;
  description: string;
};

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
