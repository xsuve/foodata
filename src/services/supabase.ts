import { Product } from '@/typings';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const addProduct = async (product: Product, image: File) => {
  const productNutritionalInfoResult = await supabase
  .from('product_nutritional_info')
  .insert({
    perWeight: null,
    energy: null,
    calories: null,
    fats: null,
    saturates: null,
    carbohydrates: null,
    sugars: null,
    fibers: null,
    proteins: null,
    salt: null,
    other: null
  })
  .select()
  .limit(1)
  .single();

  if (productNutritionalInfoResult?.error) {
    return { data: null, error: productNutritionalInfoResult.error.message };
  }

  const productResult = await supabase
  .from('products')
  .insert({
    ...product,
    nutritionalInfoId: productNutritionalInfoResult.data.id
  })
  .select()
  .limit(1)
  .single();

  if (productResult?.error) {
    return { data: null, error: productResult.error.message };
  }

  const productImageResult = await supabase.storage
  .from('product-images')
  .upload(`${productResult.data.id}/1.jpg`, image, {
    upsert: true
  });

  if (productImageResult?.error) {
    return { data: null, error: productImageResult.error.message };
  }

  return productResult;
};

export const getMarkets = async () => {
  const marketsResult = await supabase
  .from('product_markets')
  .select();

  if (marketsResult?.error) {
    return { data: null, error: marketsResult.error.message };
  }

  return marketsResult;
};

export const getTypes = async () => {
  const typesResult = await supabase
  .from('product_types')
  .select();

  if (typesResult?.error) {
    return { data: null, error: typesResult.error.message };
  }

  return typesResult;
};

export const checkCode = async (code: number) => {
  const checkCodeResult = await supabase
  .from('products')
  .select('code', { count: 'exact', head: true })
  .eq('code', code);

  if (checkCodeResult?.error) {
    return { data: null, error: checkCodeResult.error.message };
  }

  return { count: checkCodeResult.count, error: null };
};

export const getProducts = async () => {
  const productsResult = await supabase
  .from('products')
  .select();

  if (productsResult?.error) {
    return { data: null, error: productsResult.error.message };
  }

  return productsResult;
};