import type { FoodSortKey } from "../../application/sortFoods";
import "./FoodSortSelect.css";

type FoodSortSelectProps = {
  sortKey: FoodSortKey;
  onSortKeyChange: (sortKey: FoodSortKey) => void;
};

const sortOptions: Array<{
  value: FoodSortKey;
  label: string;
}> = [
  {
    value: "expiryDateAsc",
    label: "賞味期限が近い順",
  },
  {
    value: "nameAsc",
    label: "名前順",
  },
  {
    value: "createdAtDesc",
    label: "登録が新しい順",
  },
];

export function FoodSortSelect({
  sortKey,
  onSortKeyChange,
}: FoodSortSelectProps) {
  return (
    <label className="food-sort-select">
      <span className="food-sort-select__label">並び順</span>
      <select
        className="food-sort-select__select"
        value={sortKey}
        onChange={(event) => onSortKeyChange(event.target.value as FoodSortKey)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
