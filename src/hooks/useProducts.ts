import { getProducts } from '@/services/supabase';
import useSWR from 'swr';

export const useProducts = () => {
  const fetchProducts = async () => {
    const { data, error } = await getProducts();

    if (error) {
      return;
    }

    return data;
  };

  const { data } = useSWR('/products', fetchProducts);

  return data;
};