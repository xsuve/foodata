import { getMarkets } from '@/services/supabase';
import useSWR from 'swr';

export const useMarkets = () => {
  const fetchMarkets = async () => {
    const { data, error } = await getMarkets();

    if (error) {
      return;
    }

    return data;
  };

  const { data } = useSWR('/markets', fetchMarkets);

  return data;
};