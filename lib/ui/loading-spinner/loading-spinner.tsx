
import React from 'react';
import loadingSpinner from './loading-spinner.svg';

export function LoadingSpinner(): JSX.Element {
  return (
    <img src={loadingSpinner} className='w-[18px] h-[18px] inline-block m-auto' />
  )
}