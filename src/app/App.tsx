import { FoodList, mockFoods } from "../features/foods";
import "./App.css";

const today = new Date(2026, 6, 4);

export function App() {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <div>
          <p className="hero-card__eyebrow">Stockly</p>
          <h1 className="hero-card__title">食材在庫と期限を管理する</h1>
          <p className="hero-card__description">
            家にある食材、賞味期限、保管場所をまとめて管理します。
          </p>
        </div>

        <button className="hero-card__button" type="button">
          食材を追加
        </button>
      </section>

      <FoodList foods={mockFoods} today={today} />
    </main>
  );
}
