import React from 'react'

const Input = (props) => {
  const {
    onChange = () => { },
    value = '',
    placeholder = '',
    required = true,
    name = '',
    type = 'text',
    className = "",
    children,
    readOnly = false,
    ...rest
  } = props
  return (
    <div className="inputv1">
      <input
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        required={required}
        name={name}
        readOnly={readOnly}
        className={`form-control inputv2 ${className}`}
        id={name}
        value={value}
        {...rest}
      />
      {
        children &&
        <span className='icon-toggle'>
          {children}
        </span>
      }
    </div>

  )
}

export default Input