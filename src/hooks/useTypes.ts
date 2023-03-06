import { getTypes } from '@/services/supabase';
import useSWR from 'swr';

export const useTypes = () => {
  const fetchTypes = async () => {
    const { data, error } = await getTypes();

    if (error) {
      return;
    }

    return data;
  };

  const { data } = useSWR('/types', fetchTypes);

  return data;
};