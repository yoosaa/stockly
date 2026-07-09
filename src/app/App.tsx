import { useMemo, useState } from "react";
import {
  FoodForm,
  filterFoods,
  FoodFilters,
  FoodSortSelect,
  FoodSummaryCards,
  FoodTable,
  mockFoods,
  sortFoods,
  summarizeFoods,
} from "../features/foods";
import type {
  FoodFilterCriteria,
  FoodSortKey,
  FoodFormValues,
} from "../features/foods";
import type { FoodItem } from "../features/foods/domain/food";
import "./App.css";

const today = new Date(2026, 6, 5);

const initialFoodFilters: FoodFilterCriteria = {
  searchText: "",
  category: "all",
  storageLocation: "all",
  expiryStatus: "all",
};

const initialSortKey: FoodSortKey = "expiryDateAsc";

export function App() {
  const [foods, setFoods] = useState<FoodItem[]>(mockFoods);
  const [filters, setFilters] = useState(initialFoodFilters);
  const [sortKey, setSortKey] = useState(initialSortKey);

  const summary = summarizeFoods(foods, today);

  const visibleFoods = useMemo(() => {
    const filteredFoods = filterFoods(foods, filters, today);

    return sortFoods(filteredFoods, sortKey);
  }, [foods, filters, sortKey]);

  function handleAddFood(values: FoodFormValues) {
    const food: FoodItem = {
      id: `food-${Date.now()}`,
      ...values,
      createdAt: new Date().toISOString(),
    };

    setFoods((currentFoods) => [food, ...currentFoods]);
  }

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

          <button
            className="app-header__add-button"
            type="submit"
            form="food-form"
          >
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

        <FoodForm onAddFood={handleAddFood} />

        <section
          className="app-inventory"
          aria-labelledby="inventory-title"
        ></section>

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

          <FoodFilters filters={filters} onFiltersChange={setFilters} />
          <FoodSortSelect sortKey={sortKey} onSortKeyChange={setSortKey} />
          <FoodTable foods={visibleFoods} today={today} />
        </section>
      </main>
    </div>
  );
}
