import React from "react"
import { Loading } from "./loading";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

export function Button ({ onClick, children, loading, disabled }: ButtonProps): JSX.Element {
  return (
    <button className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-3xl w-full text-sm disabled:bg-gray-400" onClick={onClick} disabled={disabled ? disabled : loading}>
      {loading ? <Loading /> : children}
    </button>
  )
}