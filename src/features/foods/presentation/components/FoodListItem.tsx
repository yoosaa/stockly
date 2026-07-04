import { getExpiryStatus } from "../../domain/expiryStatus";
import type { FoodItem } from "../../domain/food";
import {
  expiryStatusLabels,
  foodCategoryLabels,
  storageLocationLabels,
} from "../foodLabels";
import "./FoodListItem.css";

type FoodListItemProps = {
  food: FoodItem;
  today: Date;
};

export function FoodListItem({ food, today }: FoodListItemProps) {
  const expiryStatus = getExpiryStatus(food.expiryDate, today);

  return (
    <li className="food-list-item" data-expiry-status={expiryStatus}>
      <div className="food-list-item__main">
        <div>
          <p className="food-list-item__name">{food.name}</p>
          <p className="food-list-item__quantity">
            {food.quantity}
            {food.unit}
          </p>
        </div>

        <div className="food-list-item__badges">
          <span className="food-list-item__badge">
            {foodCategoryLabels[food.category]}
          </span>
          <span className="food-list-item__badge">
            {storageLocationLabels[food.storageLocation]}
          </span>
        </div>
      </div>

      <div className="food-list-item__meta">
        <div>
          <span className="food-list-item__meta-label">賞味期限</span>
          <span className="food-list-item__expiry-date">{food.expiryDate}</span>
        </div>

        <span className="food-list-item__status">
          {expiryStatusLabels[expiryStatus]}
        </span>
      </div>
    </li>
  );
}
