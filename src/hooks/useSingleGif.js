import useGifs from './useGifs';
import { useState, useEffect } from 'react';
import getSingleGif from 'services/getSingleGif';

export default function useSingleGif({ id }) {
    const { gifs } = useGifs();
    const singleGifFromCache = gifs.find(singleGif => singleGif.id === id)

    const [gif, setGif] = useState(singleGifFromCache);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        
        if (!gif) {
            setIsLoading(true);
            //retrieve the single gif with specific id
            getSingleGif({ id })
                .then(gif => {
                    setGif(gif);
                    setIsLoading(false);
                    setIsError(false)
                })
                .catch(err => {
                    setIsLoading(false);
                    setIsError(false);
                })
        }
    }, [gif, id])

    return { gif, isLoading, isError };
}