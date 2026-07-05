import {
  FoodFilters,
  FoodSummaryCards,
  FoodTable,
  mockFoods,
  summarizeFoods,
} from "../features/foods";
import "./App.css";

const today = new Date(2026, 6, 5);

export function App() {
  const summary = summarizeFoods(mockFoods, today);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__brand-area">
            <a className="app-header__brand" href="/">
              Stockly
            </a>

            <nav className="app-header__nav" aria-label="メインナビゲーション">
              <a
                className="app-header__nav-link app-header__nav-link--active"
                href="/"
              >
                Dashboard
              </a>
              <a className="app-header__nav-link" href="/">
                Inventory
              </a>
              <a className="app-header__nav-link" href="/">
                Shopping List
              </a>
              <a className="app-header__nav-link" href="/">
                Recipes
              </a>
            </nav>
          </div>

          <button className="app-header__add-button" type="button">
            <span className="app-header__add-icon" aria-hidden="true">
              +
            </span>
            Add Food
          </button>
        </div>
      </header>

      <main className="app-main">
        <section className="app-hero">
          <h1 className="app-hero__title">食材在庫を管理する</h1>
          <p className="app-hero__description">
            家にある食材、賞味期限、保管場所をまとめて確認できます。
          </p>
        </section>

        <FoodSummaryCards summary={summary} />

        <section className="app-inventory" aria-labelledby="inventory-title">
          <div className="app-inventory__heading">
            <div>
              <p className="app-inventory__eyebrow">Inventory</p>
              <h2 className="app-inventory__title" id="inventory-title">
                食材一覧
              </h2>
            </div>
            <p className="app-inventory__description">
              登録済みの食材と賞味期限を確認できます。
            </p>
          </div>

          <FoodFilters />
          <FoodTable foods={mockFoods} today={today} />
        </section>
      </main>
    </div>
  );
}
