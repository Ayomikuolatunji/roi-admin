import React from 'react'
import Header from './components/Header'
import {  Switch, Route } from "react-router-dom";
import Sidebar from './components/layout/Sidebar';
import Main from './components/layout/Main';
import "./app.css"


export default function app() {
  return (
    <>
       <Header/>
       <div className='app'>
             <div i relative className='sidebar'>
                <Sidebar/>
             </div>
             <div className='main'>
                 <Main/>
             </div>
        </div>
    </>
  )
}


