import React from 'react';

import { useHome } from './use-home';
import { Sidebar } from '../sidebar';
import { Content } from '../content';
import { RocketLoading } from '../../../lib/ui/loading-rocket';
import { Header } from '../content/components/header';
import { SelectedDataContext } from '../context/context';

export function Home() {
  const { data, originalTransformedData, isLoading, availableBrokerages, selectedBrokerage, selectedTimeDuration, setSelectedTimeDuration } = useHome();

  return (
    // TODO: add current route to context(maybe in the furture)
    <SelectedDataContext.Provider value={{ originalTransformedData, selectedBrokerage, selectedTimeDuration, setSelectedTimeDuration }}>
      <div className="grid grid-cols-[220px,1fr] gap-4 text-sm">
        <div>
          <Sidebar availableBrokerages={availableBrokerages} />
        </div>
        
        <div>
          <Header />
          {isLoading ? (
            <RocketLoading />
          ) : (
            <div className="p-10 pt-4">
              <Content data={data} />
            </div>
          )}
        </div>
      </div>
    </SelectedDataContext.Provider>
  )
}