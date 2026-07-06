import type { FoodFilterCriteria } from "../../application/filterFoods";
import type { ExpiryStatus } from "../../domain/expiryStatus";
import type { FoodCategory, StorageLocation } from "../../domain/food";
import {
  expiryStatusLabels,
  foodCategoryLabels,
  storageLocationLabels,
} from "../foodLabels";
import "./FoodFilters.css";

type FoodFiltersProps = {
  filters: FoodFilterCriteria;
  onFiltersChange: (filters: FoodFilterCriteria) => void;
};

function labelEntries<T extends string>(
  labels: Record<T, string>
): Array<[T, string]> {
  return Object.entries(labels) as Array<[T, string]>;
}

function isLabelKey<T extends string>(
  labels: Record<T, string>,
  value: string
): value is T {
  return Object.hasOwn(labels, value);
}

export function FoodFilters({
  filters,
  onFiltersChange,
}: FoodFiltersProps) {
  function updateFilter<Key extends keyof FoodFilterCriteria>(
    key: Key,
    value: FoodFilterCriteria[Key]
  ) {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  }

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
            value={filters.searchText}
            onChange={(event) =>
              updateFilter("searchText", event.target.value)
            }
          />
        </span>
      </label>

      <label className="food-filters__control">
        <span className="food-filters__label">カテゴリ</span>
        <select
          className="food-filters__select"
          value={filters.category}
          onChange={(event) => {
            const value = event.target.value;

            if (
              value === "all" ||
              isLabelKey(foodCategoryLabels, value)
            ) {
              updateFilter("category", value);
            }
          }}
        >
          <option value="all">すべてのカテゴリ</option>
          {labelEntries<FoodCategory>(foodCategoryLabels).map(
            ([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            )
          )}
        </select>
      </label>

      <label className="food-filters__control">
        <span className="food-filters__label">保管場所</span>
        <select
          className="food-filters__select"
          value={filters.storageLocation}
          onChange={(event) => {
            const value = event.target.value;

            if (
              value === "all" ||
              isLabelKey(storageLocationLabels, value)
            ) {
              updateFilter("storageLocation", value);
            }
          }}
        >
          <option value="all">すべての場所</option>
          {labelEntries<StorageLocation>(storageLocationLabels).map(
            ([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            )
          )}
        </select>
      </label>

      <label className="food-filters__control">
        <span className="food-filters__label">期限</span>
        <select
          className="food-filters__select"
          value={filters.expiryStatus}
          onChange={(event) => {
            const value = event.target.value;

            if (
              value === "all" ||
              isLabelKey(expiryStatusLabels, value)
            ) {
              updateFilter("expiryStatus", value);
            }
          }}
        >
          <option value="all">すべての期限</option>
          {labelEntries<ExpiryStatus>(expiryStatusLabels).map(
            ([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            )
          )}
        </select>
      </label>
    </div>
  );
}
