import React from 'react'

export default function Header() {
  return (
    <div className="flex justify-between items-center header z-50" > 
      <div className="logo">
          <h1 className='text-2xl'>Admin Dashboard</h1>
      </div>
      <div className="lists">
          <h1 className='text-xl'>ROI Investment</h1>
      </div>
    </div>
  )
}
