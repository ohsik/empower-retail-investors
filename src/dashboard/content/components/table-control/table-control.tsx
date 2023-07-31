import React, { useContext } from "react";
import { CSVLink } from "react-csv";

import { Data, DataArrays } from "../../../../../lib/types";
import { sidebarMenu } from "../../../../../lib/consts/sidebar-menu";
import { useLocation } from "react-router-dom";
import { SelectedDataContext } from "../../../context";
import { SlashDivider } from "../../../../../lib/ui/slash-divider";

type TableControlProps = DataArrays & {
  showTable: boolean;
  showHide: () => void;
};

export function TableControl({ showTable, data, showHide }: TableControlProps): JSX.Element {
  const location = useLocation();
  const { selectedBrokerage, selectedTimeDuration } = useContext(SelectedDataContext);

  const currentRoute = location.pathname;
  const tradingType = sidebarMenu.find((item) => item.url === currentRoute)?.name as keyof Data;
  const isWithinAIQuestionLimit = data && JSON.stringify(data).length < 10000;

  function openAITab(service: 'chatgpt' | 'claude' | 'bard') {
    const aiURLs = {
      chatgpt: 'https://chat.openai.com/',
      claude: 'https://claude.ai/chats/',
      bard: 'https://bard.google.com/'
    };

    const url = aiURLs[service];

    // TODO: find the way to pass this data to attach to the question
    // Function to convert JSON data to CSV format
    function convertToCSV(data: any) {
      const headers = Object.keys(data[0]);
      const csvRows = [headers.join(',')];
    
      for (const row of data) {
        const values = headers.map(header => {
          const value = row[header];
          return typeof value === 'string' ? `"${value}"` : (typeof value === 'object' ? JSON.stringify(value) : value);
        });
        csvRows.push(values.join(','));
      }
    
      return csvRows.join('\n');
    }

    const fullURL = `${url}?messageFromERI=${encodeURIComponent(`Analyze data from: ${convertToCSV(data)}`)}`;
    
    window.open(fullURL, '_blank');
  }

  return (
    <div className="text-right text-xs grid grid-cols-[1fr,250px,14px,130px,60px] justify-end items-center my-4">
      {/* This is BETA experiment */}
      <div className="opacity-50">
        {isWithinAIQuestionLimit && `🤖 Ask AI to analyze selected trading data(BETA): `}
      </div>

      <ul className="list-none opacity-50">
        {isWithinAIQuestionLimit &&
        <>
          <li className="inline-block mx-1"><button onClick={() => openAITab(`chatgpt`)} className="border rounded-3xl px-4 py-[4px] font-semibold border-primary">ChatGPT</button></li>
          <li className="inline-block mx-1"><button onClick={() => openAITab(`claude`)} className="border rounded-3xl px-4 py-[4px] font-semibold border-primary">Claude</button></li>
          <li className="inline-block mx-1"><button onClick={() => openAITab(`bard`)} className="border rounded-3xl px-4 py-[4px] font-semibold border-primary">Bard</button></li>
        </>
        }
      </ul>

      <SlashDivider />

      {data && 
        <CSVLink data={data} filename={`${tradingType} - ${selectedBrokerage} - ${selectedTimeDuration} - Empower Retail Investors`}>
          <span className="mr-2 border rounded-3xl px-4 py-[5px]">Download CSV</span>
        </CSVLink>
      }

      <button onClick={showHide} className="border rounded-3xl px-4 text-lg">{showTable ? '🙈' : '🙉'}</button>
    </div>
  )
};