import React, { ChangeEvent } from 'react';

type SelectProps = {
  arrayData: string[] | undefined;
  selectedOption?: string; // New prop for selected option
  onChange?: (value: ChangeEvent<HTMLSelectElement>) => void;
};

export function Select({ arrayData, selectedOption, onChange }: SelectProps): JSX.Element {
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    if (onChange) {
      onChange(event);
    }
  }

  return (
    <select
      className="border rounded p-2 dark:bg-neutral-900 dark:text-slate-300 capitalize"
      onChange={handleChange}
      value={selectedOption}
    >
      {arrayData?.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}