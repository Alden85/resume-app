import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/users', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      alert('submited');
      console.log(response);
    } catch (e) {
      alert('Something has gone wrong');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='First Name'
          type='text'
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <input
          placeholder='Last Name'
          type='text'
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <input
          placeholder='email'
          type='text'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          placeholder='password'
          type='text'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Register;
