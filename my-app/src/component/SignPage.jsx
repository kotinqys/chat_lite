import React, { useEffect, useState } from 'react';
import socket from '../socket';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function SignPage({onJoined}) {

  const [isLoading,setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //Need refactoring async/await
    setLoading(true)
    const {userName,roomId} = data
    axios.post('/rooms',{userName,roomId})
    .then(onJoined(data))
    .catch(e=>{
      throw Error(e)
    })
  };

  return (
    <div className='signPage'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Lite-Chat</h1>
        <input
          type='text'
          {...register('userName', { required: true, minLength: 2 })}
          placeholder='Enter your name'
        />
        {errors.userName?.type === 'required' && (
          <span className='signPage__err'>name is required</span>
        )}
        <input
          type='text'
          {...register('roomId', { minLength: 4, maxLength: 16 })}
          placeholder='Enter code chat'
        />
        {errors.roomId?.type === 'minLength' && (
          <span className='signPage__err'>length code min 4 max 16</span>
        )}
        {errors.roomId?.type === 'maxLength' && (
          <span className='signPage__err'>length code min 4 max 16</span>
        )}
        <button disabled={isLoading}> {isLoading?'Enter...':'Enter'}</button>
      </form>
    </div>
  );
}

export default SignPage;
