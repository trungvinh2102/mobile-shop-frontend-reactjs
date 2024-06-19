import React from 'react'

const Heading = ({ children, className = '' }) => {
  return (
    <h3 className={`fs-2 heading mb-3 ${className}`}>
      {children}
    </h3>
  )
}

export default Heading