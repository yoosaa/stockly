import type { FoodItem } from "../../domain/food";
import "./FoodTable.css";
import { FoodTableRow } from "./FoodTableRow";

type FoodTableProps = {
  foods: FoodItem[];
  today: Date;
  onDeleteFood: (foodId: string) => void;
};

export function FoodTable({ foods, today, onDeleteFood }: FoodTableProps) {
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
              <th scope="col">操作</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <FoodTableRow
                key={food.id}
                food={food}
                today={today}
                onDeleteFood={onDeleteFood}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
