import React from 'react';

import { Summary } from "../components/summary";
import { Table } from "../stocks/table";

type AboutProps = {
};

export function About({}: AboutProps): JSX.Element {
  return (
    <div className='text-l max-w-xl'>
      <h1 className='text-2xl my-4'>Hi there 👋, thank you for being here.</h1>
      <p className='my-2'>Empower Retail Investors is a free portfolio reporting tool designed to provide useful tools and resources for retail investors. We are currently in beta and actively seeking feedback and contributions.</p>

      <p>If you have any feedback or are interested in contributing to Empower Retail Investors, please send an email to o(at)goodnightjournal(dot)com. We appreciate your support and look forward to hearing from you!</p>

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

      <p className='my-8'><a className='underline' href="https://github.com/ohsik/empower-retail-investors" target='_blank'>Github repo for Empower Retail Investors</a> will be public eventually as we get more contributors.<br />(current team: 🤖 ChatGPT and 😼 I)
      </p>

      <p>Current version: v 0.0.3</p>

      <h2 className='text-xl my-4 font-bold'>Upcoming:</h2>
      <ul className='list-disc list-inside'>
        <li>Better options calculation with options events</li>
        <li>Bring more brokerages 🥵</li>
      </ul>
    </div>
  )
}