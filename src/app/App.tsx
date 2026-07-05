import { FoodSummaryCards, mockFoods, summarizeFoods } from "../features/foods";
import "./App.css";

const today = new Date(2026, 6, 4);

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
      </main>
    </div>
  );
}
