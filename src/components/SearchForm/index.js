import React, { useState, useEffect, useReducer } from 'react'
import './styles.css'
import { useLocation } from 'wouter';
import useForm from './hook';

const RATINGS = ['r', 'pg-13', 'pg', 'g'];
const TYPE_RATING = {
    g: 'All public',
    pg: 'Parent Review',
    'pg-13': 'Medium public',
    r: 'Strong public'
}


function SearchForm({ initialKeyword = '', initialRate = 'r' } = {}) {

    //const [keyword, setKeyword] = useState(initialKeyword);
    //const [rating, setRating] = useState(initialRate);
    const [path, pushLocation] = useLocation();

    const { keyword, rating, updateKeyword, updateRating } = useForm({ initialKeyword, initialRate });

    useEffect(() => {
        if (path === '/' && keyword !== '') updateKeyword('');
    }, [path])

    const handleChangeKeyword = event => {
        updateKeyword(event.target.value)
    }
    const handleChangeRating = event => {
        updateRating(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        //setKeyword('');
        if (keyword && keyword.trim())
            pushLocation(`/search/${keyword}/${rating}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <button>Search</button>
            <input placeholder='Search a gif...' onChange={handleChangeKeyword} type='text' value={keyword} />
            <select onChange={handleChangeRating} value={rating}>
                <option disabled>Content type</option>
                {RATINGS.map(rating => (
                    <option value={rating} key={rating}>{TYPE_RATING[rating]}</option>
                ))}
            </select>
        </form>
    )
}
// we use react memo, to tell react to only render this component if the props he received ( onsubmit ) change
export default React.memo(SearchForm);