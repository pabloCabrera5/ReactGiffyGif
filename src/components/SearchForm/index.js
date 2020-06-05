import React, { useState } from 'react'
import './styles.css'

function SearchForm({ onSubmit }) {

    const [keyword, setKeyword] = useState('')

    const handleChange = event => {
        setKeyword(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        setKeyword('');
        onSubmit({ keyword });
    }


    return (
        <form onSubmit={handleSubmit}>
            <button>Search</button>
            <input placeholder='Search a gif...' onChange={handleChange} type='text' value={keyword} />
        </form>
    )
}
// we use react memo, to tell react to only render this component if the props he received ( onsubmit ) change
export default React.memo(SearchForm);