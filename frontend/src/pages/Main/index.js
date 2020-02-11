import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import api from '../../services/api';
import CardItem from './cardItem';

export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  const { id: devId } = match.params;

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: {
        user: devId
      }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: {
        user: devId
      }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: devId
        }
      });
      setUsers(response.data);
    }
    loadUsers();
  }, [devId]);

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: {
        user: devId
      }
    });

    socket.on('match', dev => {
      console.log(dev);
    });
  }, [devId]);

  return (
    <div className='main'>
      <Link to='/'>
        <img className='main__logo' src={logo} alt='' />
      </Link>
      {users.length > 0 ? (
        <ul className='card__list'>
          {users.map(user => (
            <CardItem {...{ key: user._id, user, handleLike, handleDislike }} />
          ))}
        </ul>
      ) : (
        <div className='main__empty'>Acabou :(</div>
      )}
    </div>
  );
}
