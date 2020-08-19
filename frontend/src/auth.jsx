import React from 'react';
import {Redirect} from 'react-router-dom';

export default function Auth({ Component }) {
  if(!localStorage.getItem('Token_react')) {
    return <Redirect to={'/'} />
  }
  return <Component />
}