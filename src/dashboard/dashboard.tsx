import React from 'react';
import { useDashboard } from './useDashboard';

export function Dashboard() {
  const { fetchedData } = useDashboard();
  console.log(fetchedData)

  return (
    <div className="grid">
      fetchedData {fetchedData && fetchedData[`fetchedData-robinhood`].timeSynced}
    </div>
  )
}