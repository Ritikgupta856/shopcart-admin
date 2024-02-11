import React from 'react'

const Heading = ({title,description}) => {
  return (
    <div className='flex flex-col gap-1'>
      <h2 className='text-3xl font-bold tracking-tight'>{title}</h2>
      <p className='text-sm text-neutral-500'>{description}</p>
    </div>
  )
}

export default Heading
