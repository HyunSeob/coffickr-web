import React from 'react';
import { Link } from 'react-router-dom'
import './PlaceCard.css';

const PlaceCard = ({ to, image, rank, name, score }) => (
  <Link
    to={ to }
    className="column PlaceCard"
    style={ { backgroundImage: `url(${image})` } }>
    <div className="PlaceCard__Background"></div>
    <span className="PlaceCard__Rank">{ rank }</span>
    <div className="PlaceCard__Center">
      <span className="PlaceCard__Name">{ name }</span>
      <span className="PlaceCard__Score">{ score }</span>
    </div>
  </Link>
);

export default PlaceCard;