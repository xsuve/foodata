export type ProductNutritionalInfo = {
  id?: string;
  perWeight: number; // g
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

export type Product = {
  id?: string;
  code: number;
  status: string;
  typeId: string;
  title: string;
  weight: number;
  marketId: string;
  price: number | null;
  nutritionalInfoId?: string;
  createdAt?: Date;
};