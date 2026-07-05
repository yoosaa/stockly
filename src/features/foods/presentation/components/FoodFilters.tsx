import "./FoodFilters.css";

export function FoodFilters() {
  return (
    <div className="food-filters" aria-label="食材の絞り込み">
      <label className="food-filters__search">
        <span className="food-filters__label">食材を検索</span>
        <span className="food-filters__search-field">
          <svg
            className="food-filters__search-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
          <input
            className="food-filters__input"
            type="search"
            placeholder="食材名で検索"
          />
        </span>
      </label>

      <label className="food-filters__control">
        <span className="food-filters__label">カテゴリ</span>
        <select className="food-filters__select" defaultValue="all">
          <option value="all">すべてのカテゴリ</option>
          <option value="vegetable">野菜</option>
          <option value="fruit">果物</option>
          <option value="meat">肉</option>
          <option value="fish">魚</option>
          <option value="dairy">乳製品</option>
          <option value="grain">穀物</option>
          <option value="drink">飲料</option>
          <option value="seasoning">調味料</option>
          <option value="other">その他</option>
        </select>
      </label>

      <label className="food-filters__control">
        <span className="food-filters__label">保管場所</span>
        <select className="food-filters__select" defaultValue="all">
          <option value="all">すべての場所</option>
          <option value="fridge">冷蔵</option>
          <option value="freezer">冷凍</option>
          <option value="room">常温</option>
        </select>
      </label>

      <label className="food-filters__control">
        <span className="food-filters__label">期限</span>
        <select className="food-filters__select" defaultValue="all">
          <option value="all">すべての期限</option>
          <option value="expired">期限切れ</option>
          <option value="expiringSoon">期限間近</option>
          <option value="safe">余裕あり</option>
        </select>
      </label>
    </div>
  );
}
