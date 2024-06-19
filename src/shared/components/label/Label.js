import React from 'react'

const Label = ({ htmlFor = "", className = "", children }) => {
  return (
    <label htmlFor={htmlFor} className={`label ${className}`}>{children}</label>
  )
}

export default Label