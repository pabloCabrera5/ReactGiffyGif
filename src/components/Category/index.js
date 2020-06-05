import React from 'react';
import { Link } from 'wouter';
import './styles.css'

export default function ListCategory(props) {

    return (
        <div className='category-list'>
            <h3 className='App-title'> {props.title}</h3>
            <ul>
                {props.list.map(gif => (
                    <li className='category-list-item' key={gif}>
                        <Link to={`/search/${gif}`} >
                            {gif}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

    )
}