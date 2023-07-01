import React from 'react';

import { Summary } from "../components/summary";
import { Table } from "../components/table";

type AboutProps = {
};

export function About({}: AboutProps): JSX.Element {
  return (
    <div>
      <h1>Hi there 👋</h1>
      <p>Thank you for using Empower Retail Investors.</p>
      <p>Empower Retail Investors is a free, open-source, and privacy-focused portfolio tracker for retail investors.</p>
      <p>Empower Retail Investors is currently in beta. If you have any feedback or interested in contributing, please send me an email to o(at)goodnightjournal(dot)com.</p>

      <h2>Currently supported brokerage</h2>
      <ul>
        <li>Robinhood</li>
      </ul>

      <h2>Empower Retail Investors is built with the following technologies:</h2>
      <ul>
        <li>React</li>
        <li>Typescript</li>
        <li>Tailwind</li>
        <li>React Router</li>
        <li>Webpack</li>
        <li>D3</li>
      </ul>

      <p>Github repo for Empower Retail Investors will be in public as we get more contributors.</p>
    </div>
  )
}