import type { FoodItem } from "../../domain/food";

export const mockFoods: FoodItem[] = [
  {
    id: "food-1",
    name: "卵",
    quantity: 10,
    unit: "個",
    category: "dairy",
    storageLocation: "fridge",
    expiryDate: "2026-07-06",
    createdAt: "2026-07-01T10:00:00.000Z",
  },
  {
    id: "food-2",
    name: "鶏むね肉",
    quantity: 2,
    unit: "枚",
    category: "meat",
    storageLocation: "freezer",
    expiryDate: "2026-07-18",
    createdAt: "2026-07-01T10:00:00.000Z",
  },
  {
    id: "food-3",
    name: "牛乳",
    quantity: 1,
    unit: "本",
    category: "drink",
    storageLocation: "fridge",
    expiryDate: "2026-07-03",
    createdAt: "2026-07-01T10:00:00.000Z",
  },
  {
    id: "food-4",
    name: "玉ねぎ",
    quantity: 3,
    unit: "個",
    category: "vegetable",
    storageLocation: "room",
    expiryDate: "2026-07-12",
    createdAt: "2026-07-01T10:00:00.000Z",
  },
];
