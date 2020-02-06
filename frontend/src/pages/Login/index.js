import React, { useState } from 'react';
import logo from '../../assets/logo.png';

import api from '../../services/api';

export default function Login({ history }) {
  const [username, setUsername] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      username
    });

    const { _id: id } = response.data;

    history.push(`/dev/${id}`);
  }

  return (
    <div className='login'>
      <form className='login__form' onSubmit={handleSubmit}>
        <img className='login__img' src={logo} alt='Logo' />
        <input
          className='login__input'
          type='text'
          placeholder='Digite seu usuário no GitHub'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button className='login__button' type='submit'>
          Enviar
        </button>
      </form>
    </div>
  );
}
