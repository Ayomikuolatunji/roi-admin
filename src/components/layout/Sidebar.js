import React from 'react'
import {CssBaseline,Grid} from "@material-ui/core";
import { Link } from 'react-router-dom';

export default function Sidebar() {

    const Navdata=[
        {link:"Export", path:"/export-product"},
        {link:"Local Products", path:"/local-products"},
        {link:"Mineral Resources", path:"/mineral-rescource"},
        {link:"Real Estate", path:"/realestate"},
    ]
  return (
    <div className='sidebasr'>
        <ul>
            {Navdata?.map(item=>{
                return <Link to={item.path}></Link>
            })}
        </ul>
    </div>
  )
}
