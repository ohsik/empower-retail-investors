import React from "react";
import { Link } from "react-router-dom";

export function AllBrokeragesSummary({ text }: { text?: string}) {
  return (
    <div className='shadow-md mb-2 p-6'>
      📣 &nbsp;
      {text ? text : 
        <>We need your help bringing more brokerages into Empower Retail Investors. Please checkout <Link to={`/about`} className='underline text-primary'>About page</Link> for more info.</>
      }
    </div>
  )
}