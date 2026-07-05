import { parseYmdToLocalDate } from "../../../../shared/utils/date";
import { getExpiryStatus } from "../../domain/expiryStatus";
import type { FoodItem } from "../../domain/food";
import {
  expiryStatusLabels,
  foodCategoryLabels,
  storageLocationLabels,
} from "../foodLabels";
import "./FoodTableRow.css";

type FoodTableRowProps = {
  food: FoodItem;
  today: Date;
};

const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function formatExpiryDate(expiryDate: string) {
  return dateFormatter.format(parseYmdToLocalDate(expiryDate));
}

export function FoodTableRow({ food, today }: FoodTableRowProps) {
  const expiryStatus = getExpiryStatus(food.expiryDate, today);

  return (
    <tr className="food-table-row">
      <td>
        <div className="food-table-row__food">
          <span className="food-table-row__avatar" aria-hidden="true">
            {food.name.slice(0, 1)}
          </span>
          <span className="food-table-row__name">{food.name}</span>
        </div>
      </td>
      <td>
        <span className="food-table-row__category">
          {foodCategoryLabels[food.category]}
        </span>
      </td>
      <td className="food-table-row__quantity">
        {food.quantity}
        {food.unit}
      </td>
      <td>{storageLocationLabels[food.storageLocation]}</td>
      <td>
        <time dateTime={food.expiryDate}>
          {formatExpiryDate(food.expiryDate)}
        </time>
      </td>
      <td>
        <span
          className="food-table-row__status"
          data-expiry-status={expiryStatus}
        >
          <span className="food-table-row__status-dot" aria-hidden="true" />
          {expiryStatusLabels[expiryStatus]}
        </span>
      </td>
      <td>
        <button
          className="food-table-row__menu"
          type="button"
          aria-label={`${food.name}の操作`}
        >
          <span aria-hidden="true">•••</span>
        </button>
      </td>
    </tr>
  );
}
