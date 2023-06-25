import React from 'react';
import { createRoot } from 'react-dom/client';
import moment from 'moment';

import { brokerages } from '../../lib/consts/brokerages';
import { Button } from '../../lib/ui/button';

import '../app.css';

const container = document.getElementById('popup');

function Popup() {
  const syncedTime = new Date();

  function syncData() {
    console.log('syncing data');
  }

  function viewReports() {
    chrome.tabs.create({url: "app.html"});
  }

  return (
    <main className="dark:bg-neutral-900 dark:text-white grid w-[440px] p-10 items-center">
      <h1 className="text-2xl font-bold">
        🚀 Empower Retail Investors
      </h1>
      <p className="text-base my-1">Sync your trading history data from {brokerages.robinhood}</p>
      <div className="my-3 grid grid-cols-2 gap-2">
        <Button onClick={syncData} children={`Sync data`} />
        <Button onClick={viewReports} children={`View reports`} />
      </div>
      <p className="text-xs italic">{syncedTime ? 'Last synced at ' + moment(syncedTime).format('MMM Do YYYY, hh:mm:ss A') : 'No data synced yet...'}</p>
    </main>
  );
}
createRoot(container!).render(<Popup />);
