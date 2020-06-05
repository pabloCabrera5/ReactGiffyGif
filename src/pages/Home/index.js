import React, { useCallback } from 'react';
import { Link, useLocation } from "wouter";
import './styles.css'
import useGifs from '../../hooks/useGifs';
import { ListOfGifs } from '../../components/ListOfGifs/ListOfGifs';

import TrendingSearches from '../../components/TrendingSearches';
import SearchForm from 'components/SearchForm';
import { Helmet } from 'react-helmet';

const POPULAR_GIFS = ['beach', 'madrid', 'spain']

export default function Home({ params }) {

    const [path, pushLocation] = useLocation();
    const { loading, gifs } = useGifs(); // {keyword} //if we want to search instantanly when we type in the input text // if we have the form in this component, right now since we move it, dont work

    // we use the usecallback hook to not create the function every time the component in render, so the props passing to the searchfom component doesnt change and the component do not rerender
    const handleSubmit = useCallback(({ keyword }) => {
        pushLocation(`/search/${keyword}`)
    }, [pushLocation])

    return (
        <div className='content'>
            <Helmet>
                <title>Home || Giffy</title>
            </Helmet>
            {/* better move to the parent so we have the search bar in all our app
            <div className='searchBar'>
                <SearchForm onSubmit={handleSubmit} />
            </div>*/}

            <div className='wrapper'>
                <div className='gifwrapper'>
                    <h3 className='App-title' id='lastsearch'> Last search gifs</h3>
                    <ListOfGifs gifs={gifs} loading={loading}></ListOfGifs>
                </div>
                <div className='trendingwrapper'>
                    <TrendingSearches />
                </div>
            </div>

        {/*
            <div className='mostPopular'>
                <h3 className='App-title'> Most popular gifs</h3>
                <ul>
                    {POPULAR_GIFS.map(gif => (
                        <li key={gif}>
                            <Link to={`/search/${gif}`} >
                                Gifs of {gif}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        */}
        </div>
    )
}