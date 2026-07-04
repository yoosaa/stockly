import type { FoodItem } from "../../domain/food";
import "./FoodList.css";
import { FoodListItem } from "./FoodListItem";

type FoodListProps = {
  foods: FoodItem[];
  today: Date;
};

export function FoodList({ foods, today }: FoodListProps) {
  if (foods.length === 0) {
    return (
      <section className="food-list">
        <div className="food-list__empty">
          <p className="food-list__empty-title">食材がまだ登録されていません</p>
          <p className="food-list__empty-description">
            まずは冷蔵庫や pantry にある食材を追加してみましょう。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="food-list" aria-label="食材一覧">
      <div className="food-list__header">
        <div>
          <h2 className="food-list__title">食材一覧</h2>
          <p className="food-list__description">
            登録済みの食材と賞味期限を確認できます。
          </p>
        </div>

        <p className="food-list__count">{foods.length}件</p>
      </div>

      <ul className="food-list__items">
        {foods.map((food) => (
          <FoodListItem key={food.id} food={food} today={today} />
        ))}
      </ul>
    </section>
  );
}
