import React from "react";

type TableControlProps = {
  showTable: boolean;
  downloadCVS: () => void;
  showHide: () => void;
};

export function TableControl({ showTable, downloadCVS, showHide }: TableControlProps): JSX.Element {
  return (
    <div className="text-right text-xs grid grid-cols-[130px,60px] justify-end items-center my-4">
      <button onClick={downloadCVS} className="mr-2 border rounded-3xl px-4 py-[5px]">Download CVS</button>
      <button onClick={showHide} className="border rounded-3xl px-4 text-lg">{showTable ? '🙈' : '🙉'}</button>
    </div>
  )
};