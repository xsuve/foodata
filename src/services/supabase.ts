import { Product } from '@/typings';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const addProduct = async (product: Product, imageBlob: Blob) => {
  const productResult = await supabase
  .from('products')
  .insert({
    ...product
  })
  .select()
  .limit(1)
  .single();

  if (productResult?.error) {
    return { data: null, error: productResult.error.message };
  }

  const productNutritionalInfoResult = await supabase
  .from('product_nutritional_info')
  .insert({
    productId: productResult.data.id,
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

  const productImageResult = await supabase.storage
  .from('product-images')
  .upload(`${productResult.data.id}/nutritional-info.jpg`, imageBlob, {
    upsert: true
  });

  if (productImageResult?.error) {
    return { data: null, error: productImageResult.error.message };
  }

  return productResult;
};

export const deleteProduct = async (id: string) => {
  const productDeleteProductNutritionalInfoResult = await supabase
  .from('product_nutritional_info')
  .delete()
  .eq('productId', id);

  if (productDeleteProductNutritionalInfoResult?.error) {
    return { data: null, error: productDeleteProductNutritionalInfoResult.error.message };
  }

  const productDeleteProductResult = await supabase
  .from('products')
  .delete()
  .eq('id', id);

  if (productDeleteProductResult?.error) {
    return { data: null, error: productDeleteProductResult.error.message };
  }

  const productDeleteImageResult = await supabase.storage
  .from('product-images')
  .remove([`${id}/nutritional-info.jpg`]);

  if (productDeleteImageResult?.error) {
    return { data: null, error: productDeleteImageResult.error.message };
  }

  return productDeleteProductResult;
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

export const getProduct = async (id: string) => {
  const productResult = await supabase
  .from('products')
  .select()
  .eq('id', id)
  .limit(1)
  .single();
  

  if (productResult?.error) {
    return { data: null, error: productResult.error.message };
  }

  return productResult;
};

export const getProductImage = async (id: string) => {
  const productImageResult = await supabase.storage
  .from('product-images')
  .getPublicUrl(`${id}/nutritional-info.jpg`);

  return productImageResult;
};