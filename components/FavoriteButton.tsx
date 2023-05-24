import axios, { AxiosRequestConfig } from 'axios';
import React, { useCallback, useMemo } from 'react';
import { BsBookmark, BsBookmarkCheckFill } from 'react-icons/bs'

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();

  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    
    //for checking type of movieId and why it err when run :: axios.delete use object { data: { movieId } } 
    //but where find unique in api for update can't handle this // change to post and it work.
    const reqConfigMovieId: AxiosRequestConfig = {};
    reqConfigMovieId.data = movieId;
    console.log(reqConfigMovieId);
    console.log(reqConfigMovieId.data);

    if (isFavorite) {
      response = await axios.post('/api/unfavorite', { movieId });
    } else {
      response = await axios.post('/api/favorite', { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({ 
      ...currentUser, 
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);
  
  const Icon = isFavorite ? BsBookmarkCheckFill : BsBookmark;

  return (
    <div onClick={toggleFavorites} className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  )
}

export default FavoriteButton;