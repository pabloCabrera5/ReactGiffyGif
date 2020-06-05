import React, { useState, useEffect } from 'react';
import { getTrendingsGifs } from '../../services/getTrendingsGifs';
import ListCategory from 'components/Category';

// component to search the trendings gifs, call the method get
export default function TrendingSearches() {
    const [trendings, setTrendings] = useState([])
    useEffect(() => {
        getTrendingsGifs().then(setTrendings)
    }, [])
    return <ListCategory title='Trendings' list={trendings} />
}
