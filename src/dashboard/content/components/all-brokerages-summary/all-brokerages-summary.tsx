import React from "react";
import { Link } from "react-router-dom";

export function AllBrokeragesSummary() {
  return (
    <div className='shadow-md mb-2 p-6'>
      📣 We need help to brings more brokerages into Empower Retail Investors. Please checkout <Link to={`/about`} className='underline text-primary'>About page</Link> for more info.
    </div>
  )
}