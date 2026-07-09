import type { FoodItem } from "../domain/food";
import { parseYmdToLocalDate } from "../../../shared/utils/date";

export type FoodSortKey = "expiryDateAsc" | "nameAsc" | "createdAtDesc";

export function sortFoods(foods: FoodItem[], sortKey: FoodSortKey): FoodItem[] {
  const copiedFoods = [...foods];

  if (sortKey === "expiryDateAsc") {
    return copiedFoods.sort((a, b) => {
      const aTime = parseYmdToLocalDate(a.expiryDate).getTime();
      const bTime = parseYmdToLocalDate(b.expiryDate).getTime();

      return aTime - bTime;
    });
  }

  if (sortKey === "nameAsc") {
    return copiedFoods.sort((a, b) => a.name.localeCompare(b.name, "ja"));
  }

  if (sortKey === "createdAtDesc") {
    return copiedFoods.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  return copiedFoods;
}
