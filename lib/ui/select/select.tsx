import React, { ChangeEvent } from 'react';

type SelectProps = {
  arrayData: string[] | undefined;
  onChange?: (value: ChangeEvent<HTMLSelectElement>) => void;
};

export function Select({ arrayData, onChange }: SelectProps): JSX.Element {
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void{
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <select 
      className="border rounded p-2 dark:bg-neutral-900 dark:text-slate-300 capitalize"
      onChange={handleChange}
    >
      {arrayData?.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
