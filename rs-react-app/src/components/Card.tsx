import type { CardProps } from '../types';
import './Card.css';

export function Card({ name, description }: CardProps) {
  return (
    <article className="result-card">
      <h3 className="result-card__name">{name}</h3>
      <p className="result-card__description">{description}</p>
    </article>
  );
}
