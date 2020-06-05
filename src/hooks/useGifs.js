import { useState, useEffect, useContext } from 'react';
import {getGifs} from '../services/getGifs'
import GifsContext from '../context/GifsContext';

const INITIAL_PAGE = 0;

// we cant put the default value of the keyword here, because the last search wouldnt work as we need the value to be undefined and go get from the localstorage, and if we set it, it will never be undefined
export default function useGifs({ keyword , limit = 11 } = {}) {
    const [loading, setLoading] = useState(false);
    const [loadingNextPage, setLoadingNextPage] = useState(false); // not using coz we use infinity scroll and do it automatically 
    //const [gifs, setGifs] = useState([]);
    const {gifs, setGifs} = useContext(GifsContext); // we use a global context to set our gifs
    const [page, setPage] = useState(INITIAL_PAGE); // for the pagination 
    
    const nextKeyword = keyword || localStorage.getItem('lastKeyword') || 'puppys'; // for the last search results
    
    useEffect(() => {
        setLoading(true);
        getGifs({ keyword: nextKeyword, limit: limit })
            .then(gifs => {
                localStorage.setItem('lastKeyword', nextKeyword);
                setLoading(false);
                // here we set the state of the Gifscontext with all the gifs
                setGifs(gifs);
            })
    }, [keyword, nextKeyword, setGifs]) // need the setGifs ?

    useEffect( () => {
        if(page === INITIAL_PAGE) return;
        setLoadingNextPage(true);
        getGifs({keyword: nextKeyword, page})
        .then(nextGifs => {
            setGifs(prevGifs => prevGifs.concat(nextGifs));
            setLoadingNextPage(false);
        })
    }, [ nextKeyword, page, keyword, setGifs])

    return { loading, loadingNextPage, gifs, setPage }
}
