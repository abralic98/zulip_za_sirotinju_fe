import React, { forwardRef } from 'react'

export const ObservableElement = forwardRef<HTMLDivElement>(({}, ref) => {
  if (!ref) return null
  return (
    <div
      style={{ visibility: 'hidden', width: '1px', height: '1px' }}
      // style={{ background: 'red', width: '100px', height: '50px' }}
      ref={ref}
    >
      k
    </div>
  )
})

ObservableElement.displayName = 'observable element'
