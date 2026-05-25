import { Card } from './Card';
import { extractPersonId } from '../utils/extractPersonId';
import type { CardListProps } from '../types';
import './CardList.css';

export function CardList({
  items,
  selectedItemId,
  onItemSelect,
}: CardListProps) {
  return (
    <ul className="card-list" aria-label="Search results">
      {items.map((item) => (
        <li key={item.id} className="card-list__item">
          <Card
            id={item.id}
            name={item.name}
            isSelected={
              selectedItemId !== null &&
              extractPersonId(item.id) === selectedItemId
            }
            onSelect={onItemSelect}
          />
        </li>
      ))}
    </ul>
  );
}
