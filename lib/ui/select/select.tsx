import  React from 'react';

type SelectProps = {
  arrayData: string[] | undefined;
};

export function Select({ arrayData }: SelectProps): JSX.Element {
  return (
    <select className="border rounded p-2">
      {arrayData?.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};