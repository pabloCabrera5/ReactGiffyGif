//Page who renders the list of gifs component

import React, { useRef, useEffect, useCallback } from 'react';

import { ListOfGifs } from '../../components/ListOfGifs/ListOfGifs';
import Spinner from '../../components/Spinner';
import useGifs from '../../hooks/useGifs';
import useNearScreen from 'hooks/useNearScreen';
// debounce let us control the # of calls made to an API if a event occur many times in a short period
import debounce from 'just-debounce-it';
import { Helmet } from 'react-helmet';

export default function SearchResults({ params }) {

    const { keyword } = params;
    const { loading, gifs, setPage, loadingNextPage } = useGifs({ keyword });

    const externalRef = useRef();
    const { isNearScreen, fromRef } = useNearScreen({
        externalRef: loading ?
            null : externalRef,
        once: false
    });
    const title = gifs ? `${gifs.length} results of ${keyword}` : ''

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1)
    }
    // we put it in the hook useCallback to not create the same function each time the component is render
    // usecallback receive a function. And debounce return a function
    const debounceHandleNextPage = useCallback(debounce(
        () => setPage(prevPage => prevPage + 1), 1000
    ), [])

    useEffect(() => {
        if (isNearScreen) debounceHandleNextPage();
    }, [debounceHandleNextPage, isNearScreen])

    if (loading) return <i><Spinner /></i>
    return (
        <>
            <Helmet>
                <title>{decodeURI(title)}</title>
                <meta name="description" content={title} />
                <meta name="rating" content="General" />
            </Helmet>
            <>
                <h3 className='App-title' id='resulttitle'>{decodeURI(keyword)}</h3>
                <ListOfGifs gifs={gifs} />
                {loadingNextPage && <Spinner />}
            </>
            <div id='visor' ref={externalRef}></div>
            <button onClick={handleNextPage}>Next Page</button>
        </>
    )
}

