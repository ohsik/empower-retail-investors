import React from 'react';

export function About(): JSX.Element {
  return (
    <div className='text-l max-w-xl'>
      <h1 className='text-2xl my-4'>Hi there 👋, thank you for being here.</h1>
      <p className='my-2'>Empower Retail Investors is a free portfolio reporting tool designed to provide useful tools and resources for retail investors. We are currently in beta and actively seeking feedback and contributions.</p>

      <p>If you have feature requests, any feedback or are interested in contributing to Empower Retail Investors, please send an email to o(at)goodnightjournal(dot)com. We appreciate your support and look forward to hearing from you!</p>

      <h2 className='text-xl my-4 font-bold'>Currently supported brokerage:</h2>
      <ul className='list-disc list-inside'>
        <li>Robinhood <i>(Fully supported)</i></li>
        <li>Thinkorswim <i>(Not supported due to tdameritrade API restriction)</i></li>
        <li>Charles Schwab <i>(Coming soon)</i></li>
        <li>Webull <i>(Coming soon)</i></li>
        <li>E-Trade <i>(Coming soon)</i></li>
        <li>Interactive Brokers <i>(Coming soon)</i></li>
        <li>Fidelity <i>(Coming soon)</i></li>
      </ul>

      <h2 className='text-xl my-4 font-bold'>Built with the following technologies:</h2>
      <ul className='list-disc list-inside'>
        <li>React / Typescript</li>
        <li>Tailwind</li>
        <li>React Router</li>
        <li>Webpack</li>
        <li>D3</li>
      </ul>

      <p className='my-8'>Empower Retail Investors is an open source project. Check out the <a className='underline' href="https://github.com/ohsik/empower-retail-investors" target='_blank'>Github repo.</a><br />
      </p>

      <p>Current version: v 0.0.18</p>

      <h2 className='text-xl my-4 font-bold'>Upcoming:</h2>
      <ul className='list-disc list-inside'>
        <li>Better options calculation with options events</li>
        <li>Bring more brokerages 🥵 (currently in progress: Thinkorswim)</li>
      </ul>
    </div>
  )
}