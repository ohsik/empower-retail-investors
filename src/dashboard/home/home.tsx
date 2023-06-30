import React from 'react';
import { useHome } from './useHome';
import { Sidebar } from '../sidebar';
import { Content } from '../content';

export function Home() {
  const { fetchedData } = useHome();
  console.log(fetchedData)

  return (
    <div className="grid grid-cols-[200px,1fr] gap-4 text-sm">
      <div>
        <Sidebar />
      </div>
      
      <div>
        <Content data={fetchedData} />
      </div>
    </div>
  )
}