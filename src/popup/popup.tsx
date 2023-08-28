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
    currentBrokerage,
    isFetchDataExist,
    currentUrl,
    syncErrorMessage,
    timeSynced,
    isCurrentBrokerageSupported,
  } = usePopup();

  return (
    <main className="dark:bg-neutral-900 dark:text-slate-300 grid w-[440px] p-10 items-center">
      <h1 className="text-2xl font-bold text-primary">
        <span className='mr-2 text-2xl'>🚀</span> Empower Retail Investors
      </h1>
      <div className="text-base my-2">
        {currentBrokerage
          ? `Sync your trading history data from ${brokerageNames[currentBrokerage]}`
          : <p>This extension is exclusively designed for <i>US stock exchange brokerage</i> websites.</p>
        }
      </div>
      
      <div className="my-3 grid grid-cols-2 gap-2">
        <Button onClick={syncData} children={`Sync data`} loading={isSyncing} disabled={!currentBrokerage || !isCurrentBrokerageSupported} />
        <Button onClick={viewReports} children={`View reports`} disabled={!isFetchDataExist || isSyncing} />
      </div>

      {/* Error messages */}
      {(!currentBrokerage || !isCurrentBrokerageSupported) && 
        <p className="text-xs italic my-1 break-all">
          {currentBrokerage && brokerageNames[currentBrokerage]}({currentUrl}) <b>is not supported at the moment</b>
        </p>
      }

      {syncErrorMessage && 
        <p className="text-xs italic my-1">{`${syncErrorMessage} Please ensure that you are logged in, reload the page, and then sync again.(Sometimes, logging in again can resolve the issue)`}</p>
      }

      {isCurrentBrokerageSupported && currentBrokerage && !syncErrorMessage && 
        <p className="text-xs italic my-1">{timeSynced ? 'Last synced at ' + moment(timeSynced).format('MMM Do YYYY, hh:mm:ss A') : 'Click Sync data button to get your report!'}</p>
      }
    </main>
  );
}
