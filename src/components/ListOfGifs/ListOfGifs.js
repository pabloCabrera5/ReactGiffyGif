import React from 'react';
import { Gif } from '../Gif/Gifs';
import './ListOfGifs.css'

export function ListOfGifs({ gifs }) {

    return (
        <div className='listofgifs-grid'>
            {gifs.map(gif => {
                return <Gif 
                    key={gif.id}
                    title={gif.title}
                    id={gif.id}
                    url={gif.url} />
            })}
        </div>
    )
}