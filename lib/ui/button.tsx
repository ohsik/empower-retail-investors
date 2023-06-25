import React from "react"

type ButtonProps = {
  onClick: () => void
  children: React.ReactNode
}

export function Button ({ onClick, children }: ButtonProps): JSX.Element {
  return (
    <button className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-3xl w-full text-sm disabled:bg-gray-400" onClick={onClick}>
      {children}
    </button>
  )
}