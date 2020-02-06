import React from 'react';
import imgLike from '../../assets/like.png';
import imgDislike from '../../assets/dislike.png';

export default function CardItem({ user, handleLike, handleDislike }) {
  const { _id: id, avatar, name, bio } = user;

  return (
    <li className='card__list-item'>
      <img className='card__img' src={avatar} alt={name} />
      <div className='card__desc'>
        <h2 className='card__title'>{name}</h2>
        <p>{bio}</p>
      </div>
      <div className='card__actions'>
        <button className='card__button' onClick={() => handleLike(id)}>
          <img src={imgLike} alt='Like' />
        </button>
        <button className='card__button' onClick={() => handleDislike(id)}>
          <img src={imgDislike} alt='card__button' />
        </button>
      </div>
    </li>
  );
}
