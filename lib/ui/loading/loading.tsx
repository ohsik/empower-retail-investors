
import React from 'react';
import loading from './loading.svg';

export function Loading(): JSX.Element {
  return (
    <img src={loading} className='w-[18px] h-[18px] inline-block m-auto' />
  )
}