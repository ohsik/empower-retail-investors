import React from 'react';
import { useHome } from './useHome';
import { Sidebar } from '../sidebar';
import { Content } from '../content';
import { RocketLoading } from '../../../lib/ui/loading-rocket';

export function Home() {
  const { data, isLoading } = useHome();

  return (
    <div className="grid grid-cols-[220px,1fr] gap-4 text-sm">
      <div>
        <Sidebar />
      </div>
      
      <div>
        {isLoading ? <RocketLoading /> : <Content data={data} />}
      </div>
    </div>
  )
}