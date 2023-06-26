import React from 'react';
import moment from 'moment';
import { usePopup } from './usePopup';

import { brokerageNames } from '../../lib/consts/brokerages';
import { Button } from '../../lib/ui/button';

export function Popup(): JSX.Element {
  const { 
    syncData,
    viewReports,
    isSyncing,
    currentBrokage,
    isFetchDataExist,
    currentUrl,
    syncErrorMessage,
    syncedTime,
    isCurrentBrokageSupported,
  } = usePopup();

  return (
    <main className="dark:bg-neutral-900 dark:text-white grid w-[440px] p-10 items-center">
      <h1 className="text-2xl font-bold">
        🚀 Empower Retail Investors
      </h1>
      <p className="text-base my-2">
      {currentBrokage
        ? `Sync your trading history data from ${brokerageNames[currentBrokage]}`
        : "This extension can only be used on US stock brokerage websites"}  
      </p>
      
      <div className="my-3 grid grid-cols-2 gap-2">
        <Button onClick={syncData} children={`Sync data`} loading={isSyncing} disabled={!currentBrokage || !isCurrentBrokageSupported} />
        <Button onClick={viewReports} children={`View reports`} disabled={!isFetchDataExist || isSyncing} />
      </div>

      {/* Error messages */}
      {(!currentBrokage || !isCurrentBrokageSupported) && 
        <p className="text-xs italic my-1 break-all">
          {currentBrokage && brokerageNames[currentBrokage]}({currentUrl}) is not supported at the moment
        </p>
      }

      {syncErrorMessage && 
        <p className="text-xs italic my-1">{`${syncErrorMessage} Please login to Robinhood and try again.`}</p>
      }

      {isCurrentBrokageSupported && currentBrokage && !syncErrorMessage && 
        <p className="text-xs italic my-1">{syncedTime ? 'Last synced at ' + moment(syncedTime).format('MMM Do YYYY, hh:mm:ss A') : 'Click Sync data button to get your first report!'}</p>
      }
    </main>
  );
}
