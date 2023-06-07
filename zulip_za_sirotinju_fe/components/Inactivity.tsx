import { useInactive } from '@/hooks/useInactive'
import React from 'react'

export const Inactivity = () => {

  const inactive = useInactive()
  return (
    <div>Inactivity</div>
  )
}
