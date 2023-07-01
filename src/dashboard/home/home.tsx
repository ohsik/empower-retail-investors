import React from 'react';
import { HashRouter } from 'react-router-dom';

import { Brokerages } from '../../../lib/consts/brokerages';
import { useHome } from './useHome';
import { Sidebar } from '../sidebar';
import { Content } from '../content';
import { RocketLoading } from '../../../lib/ui/loading-rocket';

export function Home() {
  const { data, isLoading } = useHome();
  const availableBrokerages = data && Object.keys(data) as Brokerages[];

  return (
    <HashRouter>
      <div className="grid grid-cols-[220px,1fr] gap-4 text-sm">
        <div>
          <Sidebar availableBrokerages={availableBrokerages} />
        </div>
        
        <div>
          {isLoading ? <RocketLoading /> : <Content data={data} />}
        </div>
      </div>
    </HashRouter>
  )
}