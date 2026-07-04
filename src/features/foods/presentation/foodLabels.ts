import type { FoodCategory, StorageLocation } from "../domain/food";
import type { ExpiryStatus } from "../domain/expiryStatus";

export const foodCategoryLabels: Record<FoodCategory, string> = {
  vegetable: "野菜",
  fruit: "果物",
  meat: "肉",
  fish: "魚",
  dairy: "乳製品",
  grain: "穀物",
  drink: "飲料",
  seasoning: "調味料",
  other: "その他",
};

export const storageLocationLabels: Record<StorageLocation, string> = {
  fridge: "冷蔵",
  freezer: "冷凍",
  room: "常温",
};

export const expiryStatusLabels: Record<ExpiryStatus, string> = {
  expired: "期限切れ",
  expiringSoon: "期限間近",
  safe: "余裕あり",
};
