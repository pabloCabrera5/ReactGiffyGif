import React from 'react';
import './Gif.css'
import { Link } from 'wouter';

function Giff({ title, id, url }) {
  return (
    <div className='Gif'>
      <Link to={`/gif/${id}`} className='Gif-link'>
        <h4> {title}</h4>
        <img loading='lazy' src={url} alt={title} />
      </Link>

    </div>

  )
}
// we use react memo to only renders the component when the props coming change
export const Gif = React.memo(Giff, (prevProps, nextProps) => (
  prevProps.id === nextProps.id
))