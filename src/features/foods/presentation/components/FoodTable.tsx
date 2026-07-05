import type { FoodItem } from "../../domain/food";
import "./FoodTable.css";
import { FoodTableRow } from "./FoodTableRow";

type FoodTableProps = {
  foods: FoodItem[];
  today: Date;
};

export function FoodTable({ foods, today }: FoodTableProps) {
  return (
    <div className="food-table-card">
      <div className="food-table-card__meta">
        <p className="food-table-card__count">
          <strong>{foods.length}</strong> 件の食材
        </p>
        <p className="food-table-card__hint">登録済みの食材を表示しています</p>
      </div>

      <div className="food-table-card__scroller">
        <table className="food-table">
          <thead>
            <tr>
              <th scope="col">食材名</th>
              <th scope="col">カテゴリ</th>
              <th scope="col">数量</th>
              <th scope="col">保管場所</th>
              <th scope="col">賞味期限</th>
              <th scope="col">ステータス</th>
              <th className="food-table__actions-heading" scope="col">
                <span className="food-table__visually-hidden">操作</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <FoodTableRow key={food.id} food={food} today={today} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
