import { Card } from './Card';
import { useSelectedItemsStore } from '../hooks/useSelectedItemsStore';
import { extractPersonId } from '../utils/extractPersonId';
import type { CardListProps } from '../types';
import './CardList.css';

export function CardList({
  items,
  selectedItemId,
  onItemSelect,
}: CardListProps) {
  const { items: selectedItems, toggleItem } = useSelectedItemsStore();

  return (
    <ul className="card-list" aria-label="Search results">
      {items.map((item) => {
        const isChecked = selectedItems.some(
          (selected) => selected.id === item.id
        );
        return (
          <li key={item.id} className="card-list__item">
            <Card
              id={item.id}
              name={item.name}
              isDetailsSelected={
                selectedItemId !== null &&
                extractPersonId(item.id) === selectedItemId
              }
              isChecked={isChecked}
              onToggleCheck={() => toggleItem(item)}
              onOpenDetails={onItemSelect}
            />
          </li>
        );
      })}
    </ul>
  );
}
