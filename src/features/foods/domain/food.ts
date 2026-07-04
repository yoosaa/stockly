export type FoodCategory =
  | "vegetable"
  | "fruit"
  | "meat"
  | "fish"
  | "dairy"
  | "grain"
  | "drink"
  | "seasoning"
  | "other";

export type StorageLocation = "fridge" | "freezer" | "room";

export type FoodItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: FoodCategory;
  storageLocation: StorageLocation;
  expiryDate: string;
  createdAt: string;
};
