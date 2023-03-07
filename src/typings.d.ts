export type ProductNutritionalInfo = {
  id?: string;
  energy: number; // kJ
  calories: number; // kCal
  fats: number; // g
  saturates: number; // g
  carbohydrates: number; // g
  sugars: number; // g
  fibers: number; // g
  proteins: number; // g
  salt: number; // mg
  other: string;
};

export type ProductNetWeight = {
  value: number;
  unit: string;
};

export type Product = {
  id?: string;
  code: number;
  status: string;
  typeId: string;
  title: string;
  netWeight: ProductNetWeight;
  marketId: string;
  price: number | null;
  nutritionalInfoId?: string;
  createdAt?: Date;
};