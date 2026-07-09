import { useState } from "react";
import type {
  FoodCategory,
  FoodItem,
  StorageLocation,
} from "../../domain/food";
import { foodCategoryLabels, storageLocationLabels } from "../foodLabels";
import "./FoodForm.css";

export type FoodFormValues = Omit<FoodItem, "id" | "createdAt">;

type FoodFormProps = {
  onAddFood: (values: FoodFormValues) => void;
};

const initialValues: FoodFormValues = {
  name: "",
  quantity: 1,
  unit: "個",
  category: "vegetable",
  storageLocation: "fridge",
  expiryDate: "2026-07-10",
};

const categoryOptions = Object.entries(foodCategoryLabels) as Array<
  [FoodCategory, string]
>;

const storageLocationOptions = Object.entries(storageLocationLabels) as Array<
  [StorageLocation, string]
>;

export function FoodForm({ onAddFood }: FoodFormProps) {
  const [values, setValues] = useState<FoodFormValues>(initialValues);

  function updateValue<Key extends keyof FoodFormValues>(
    key: Key,
    value: FoodFormValues[Key]
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = values.name.trim();

    if (trimmedName === "") {
      return;
    }

    onAddFood({
      ...values,
      name: trimmedName,
    });

    setValues(initialValues);
  }

  return (
    <form className="food-form" id="food-form" onSubmit={handleSubmit}>
      <div className="food-form__header">
        <div>
          <p className="food-form__eyebrow">Add food</p>
          <h2 className="food-form__title">食材を追加する</h2>
        </div>
        <p className="food-form__description">
          家にある食材名、数量、保管場所、賞味期限を入力します。
        </p>
      </div>

      <div className="food-form__grid">
        <label className="food-form__field food-form__field--wide">
          <span className="food-form__label">食材名</span>
          <input
            className="food-form__input"
            type="text"
            value={values.name}
            placeholder="例：ヨーグルト"
            onChange={(event) => updateValue("name", event.target.value)}
          />
        </label>

        <label className="food-form__field">
          <span className="food-form__label">数量</span>
          <input
            className="food-form__input"
            type="number"
            min="1"
            value={values.quantity}
            onChange={(event) =>
              updateValue("quantity", Number(event.target.value))
            }
          />
        </label>

        <label className="food-form__field">
          <span className="food-form__label">単位</span>
          <input
            className="food-form__input"
            type="text"
            value={values.unit}
            onChange={(event) => updateValue("unit", event.target.value)}
          />
        </label>

        <label className="food-form__field">
          <span className="food-form__label">カテゴリ</span>
          <select
            className="food-form__select"
            value={values.category}
            onChange={(event) =>
              updateValue("category", event.target.value as FoodCategory)
            }
          >
            {categoryOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="food-form__field">
          <span className="food-form__label">保管場所</span>
          <select
            className="food-form__select"
            value={values.storageLocation}
            onChange={(event) =>
              updateValue(
                "storageLocation",
                event.target.value as StorageLocation
              )
            }
          >
            {storageLocationOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="food-form__field">
          <span className="food-form__label">賞味期限</span>
          <input
            className="food-form__input"
            type="date"
            value={values.expiryDate}
            onChange={(event) => updateValue("expiryDate", event.target.value)}
          />
        </label>
      </div>

      <div className="food-form__actions">
        <button className="food-form__submit" type="submit">
          食材を追加
        </button>
      </div>
    </form>
  );
}
