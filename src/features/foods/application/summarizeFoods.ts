import { getExpiryStatus } from "../domain/expiryStatus";
import type { FoodItem } from "../domain/food";

export type FoodSummary = {
  expiredCount: number;
  expiringSoonCount: number;
  totalCount: number;
};

export function summarizeFoods(foods: FoodItem[], today: Date): FoodSummary {
  return foods.reduce<FoodSummary>(
    (summary, food) => {
      const expiryStatus = getExpiryStatus(food.expiryDate, today);

      if (expiryStatus === "expired") {
        return {
          ...summary,
          expiredCount: summary.expiredCount + 1,
        };
      }

      if (expiryStatus === "expiringSoon") {
        return {
          ...summary,
          expiringSoonCount: summary.expiringSoonCount + 1,
        };
      }

      return summary;
    },
    {
      expiredCount: 0,
      expiringSoonCount: 0,
      totalCount: foods.length,
    }
  );
}
