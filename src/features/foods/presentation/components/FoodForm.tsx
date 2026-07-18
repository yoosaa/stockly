import { useState } from "react";
import type {
  FoodCategory,
  FoodItem,
  StorageLocation,
} from "../../domain/food";
import { foodCategoryLabels, storageLocationLabels } from "../foodLabels";
import "./FoodForm.css";

export type FoodFormValues = Omit<FoodItem, "id" | "createdAt">;
type FoodFormErrors = Partial<Record<keyof FoodFormValues, string>>;

function validateFoodForm(values: FoodFormValues): FoodFormErrors {
  const errors: FoodFormErrors = {};

  if (values.name.trim() === "") {
    errors.name = "食材名を入力してください。";
  }

  if (!Number.isFinite(values.quantity) || values.quantity < 1) {
    errors.quantity = "数量は1以上で入力してください。";
  }

  if (values.unit.trim() === "") {
    errors.unit = "単位を入力してください。";
  }

  if (values.expiryDate === "") {
    errors.expiryDate = "賞味期限を選択してください。";
  }

  return errors;
}

type FoodFormProps = {
  initialValues?: FoodFormValues;
  onSubmitFood: (values: FoodFormValues) => void;
  onCancelEdit?: () => void;
};

const emptyFoodFormValues: FoodFormValues = {
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

export function FoodForm({
  initialValues,
  onSubmitFood,
  onCancelEdit,
}: FoodFormProps) {
  const isEditing = initialValues !== undefined;
  const formInitialValues = initialValues ?? emptyFoodFormValues;
  const [values, setValues] = useState<FoodFormValues>(formInitialValues);
  const [errors, setErrors] = useState<FoodFormErrors>({});

  function updateValue<Key extends keyof FoodFormValues>(
    key: Key,
    value: FoodFormValues[Key]
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [key]: undefined,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateFoodForm(values);

    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      return;
    }

    const trimmedName = values.name.trim();

    onSubmitFood({
      ...values,
      name: trimmedName,
    });

    setErrors({});

    if (!isEditing) {
      setValues(emptyFoodFormValues);
    }
  }

  function handleCancelEdit() {
    setErrors({});
    setValues(emptyFoodFormValues);
    onCancelEdit?.();
  }

  return (
    <form className="food-form" id="food-form" onSubmit={handleSubmit}>
      <div className="food-form__header">
        <div>
          <p className="food-form__eyebrow">
            {isEditing ? "Edit food" : "Add food"}
          </p>
          <h2 className="food-form__title">
            {isEditing ? "食材を編集" : "食材を追加する"}
          </h2>
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
            aria-invalid={Boolean(errors.name)}
            aria-describedby="food-name-error"
            onChange={(event) => updateValue("name", event.target.value)}
          />

          <span
            className="food-form__error"
            id="food-name-error"
            aria-live="polite"
          >
            {errors.name ?? ""}
          </span>
        </label>

        <label className="food-form__field">
          <span className="food-form__label">数量</span>
          <input
            className="food-form__input"
            type="number"
            min="1"
            value={values.quantity}
            aria-invalid={Boolean(errors.quantity)}
            aria-describedby="food-quantity-error"
            onChange={(event) =>
              updateValue("quantity", Number(event.target.value))
            }
          />

          <span
            className="food-form__error"
            id="food-quantity-error"
            aria-live="polite"
          >
            {errors.quantity ?? ""}
          </span>
        </label>

        <label className="food-form__field">
          <span className="food-form__label">単位</span>
          <input
            className="food-form__input"
            type="text"
            value={values.unit}
            aria-invalid={Boolean(errors.unit)}
            aria-describedby="food-unit-error"
            onChange={(event) => updateValue("unit", event.target.value)}
          />

          <span
            className="food-form__error"
            id="food-unit-error"
            aria-live="polite"
          >
            {errors.unit ?? ""}
          </span>
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
          <span className="food-form__error" aria-hidden="true">
            {""}
          </span>
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
          <span className="food-form__error" aria-hidden="true">
            {""}
          </span>
        </label>

        <label className="food-form__field">
          <span className="food-form__label">賞味期限</span>
          <input
            className="food-form__input"
            type="date"
            value={values.expiryDate}
            aria-invalid={Boolean(errors.expiryDate)}
            aria-describedby="food-expiry-date-error"
            onChange={(event) => updateValue("expiryDate", event.target.value)}
          />

          <span
            className="food-form__error"
            id="food-expiry-date-error"
            aria-live="polite"
          >
            {errors.expiryDate ?? ""}
          </span>
        </label>
      </div>

      <div className="food-form__actions">
        {isEditing ? (
          <button
            className="food-form__cancel"
            type="button"
            onClick={handleCancelEdit}
          >
            キャンセル
          </button>
        ) : null}
        <button className="food-form__submit" type="submit">
          {isEditing ? "変更を保存" : "食材を追加"}
        </button>
      </div>
    </form>
  );
}
