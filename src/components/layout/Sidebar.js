import React from 'react'
import { Link } from 'react-router-dom';

export default function Sidebar() {

    const Navdata=[
        {link:"Home", path:"/"},
        {link:"Export", path:"/export-products"},
        {link:"Local Products", path:"/local-products"},
        {link:"Mineral Resources", path:"/mineral-resource"},
        {link:"Real Estate", path:"/realestate"},
    ]
  return (
    <div className='sidebasr'>
        <ul className='flex sm:flex-col justify-center items-end mt-10 text-center'>
            {Navdata.map((item,index)=>{
                return <Link to={item.path} key={index} className="text-white sm:py-4 sm:px-3 sm:mr-3 px-2 sm:text-xl">{item.link}</Link>
            })}
        </ul>
    </div>
  )
}
