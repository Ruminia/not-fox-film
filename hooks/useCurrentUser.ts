//swr package for fetching data (similar as react query)
//the first fetch API current and not going fetching again if this hooks are use some where.
//it make no needed redux or any state management for fetching user.
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

    return{
        data,
        error,
        isLoading,
        mutate,
    }
};

export default useCurrentUser;