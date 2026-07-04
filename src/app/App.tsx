import "./App.css";

export function App() {
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

        <section className="app-placeholder-grid" aria-label="サマリー">
          <div className="app-summary-card app-summary-card--danger">
            <p className="app-summary-card__label">期限切れ</p>
            <p className="app-summary-card__value">2</p>
            <p className="app-summary-card__description">
              早めに確認したい食材です。
            </p>
          </div>

          <div className="app-summary-card app-summary-card--warning">
            <p className="app-summary-card__label">期限間近</p>
            <p className="app-summary-card__value">5</p>
            <p className="app-summary-card__description">
              3日以内に使いたい食材です。
            </p>
          </div>

          <div className="app-summary-card app-summary-card--primary">
            <p className="app-summary-card__label">登録食材</p>
            <p className="app-summary-card__value">42</p>
            <p className="app-summary-card__description">
              すべての保管場所の合計です。
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
