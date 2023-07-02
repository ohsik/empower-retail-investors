import React from 'react';

import { Summary } from "../components/summary";
import { Table } from "../stocks/table";

type AboutProps = {
};

export function About({}: AboutProps): JSX.Element {
  return (
    <div className='text-l max-w-xl'>
      <h1 className='text-3xl my-4'>Hi there 👋, thank you for using Empower Retail Investors.</h1>
      <p className='my-2'>Empower Retail Investors is a free, open-source, and privacy-focused portfolio reports for retail investors. Empower Retail Investors is currently in beta. If you have any feedback or interested in contributing, please send me an email to o(at)goodnightjournal(dot)com.</p>

      <h2 className='text-xl my-4 font-bold'>Currently supported brokerage:</h2>
      <ul className='list-disc list-inside'>
        <li>Robinhood</li>
        <li>Thinkorswim <i>(Not supported yet)</i></li>
        <li>E-Trade <i>(Not supported yet)</i></li>
        <li>Interactive Brokers <i>(Not supported yet)</i></li>
        <li>Webull <i>(Not supported yet)</i></li>
        <li>Charles Schwab <i>(Not supported yet)</i></li>
        <li>Fidelity <i>(Not supported yet)</i></li>
      </ul>

      <h2 className='text-xl my-4 font-bold'>Built with the following technologies:</h2>
      <ul className='list-disc list-inside'>
        <li>React / Typescript</li>
        <li>Tailwind</li>
        <li>React Router</li>
        <li>Webpack</li>
        <li>D3</li>
      </ul>

      <p className='my-8'>Github repo for Empower Retail Investors will be in public as we get more contributors.</p>

      <p>Current version: v 0.0.1</p>
    </div>
  )
}