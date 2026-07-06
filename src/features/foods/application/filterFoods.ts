import { getExpiryStatus } from "../domain/expiryStatus";
import type { ExpiryStatus } from "../domain/expiryStatus";
import type {
  FoodCategory,
  FoodItem,
  StorageLocation,
} from "../domain/food";

export type FoodFilterCriteria = {
  searchText: string;
  category: FoodCategory | "all";
  storageLocation: StorageLocation | "all";
  expiryStatus: ExpiryStatus | "all";
};

export function filterFoods(
  foods: FoodItem[],
  filters: FoodFilterCriteria,
  today: Date
): FoodItem[] {
  const normalizedSearchText = filters.searchText.trim().toLocaleLowerCase();

  return foods.filter((food) => {
    const matchesSearchText =
      normalizedSearchText === "" ||
      food.name.toLocaleLowerCase().includes(normalizedSearchText);
    const matchesCategory =
      filters.category === "all" || food.category === filters.category;
    const matchesStorageLocation =
      filters.storageLocation === "all" ||
      food.storageLocation === filters.storageLocation;
    const matchesExpiryStatus =
      filters.expiryStatus === "all" ||
      getExpiryStatus(food.expiryDate, today) === filters.expiryStatus;

    return (
      matchesSearchText &&
      matchesCategory &&
      matchesStorageLocation &&
      matchesExpiryStatus
    );
  });
}
