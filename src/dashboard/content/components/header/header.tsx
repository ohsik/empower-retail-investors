import React from "react";
import { Select } from "../../../../../lib/ui/select";

type HeaderProps = {
  title: string 
};

export function Header({ title }: HeaderProps ): JSX.Element {
  const timeDurationSelect: string[] = [
    'All Time',
    'Yealy',
    'Monthly',
    'Weekly',
    'Daily',
  ];

  return (
    <div className="grid grid-cols-[1fr,120px] items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <div className="text-right">
        <Select arrayData={timeDurationSelect} />
      </div>
    </div>
  )
}