import React from 'react'
import Header from './components/layout/Header'
import { Routes ,Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Main from './components/layout/Main';
import Estate from './components/util/Estate';
import Mineral from './components/util/Mineral';
import Local from "./components/util/Local"
import Export from './components/util/Export';
import "./app.css"


export default function app() {
  return (
    <>
       <Header/>
       <div className='app'>
             <div  className='sidebar'>
                <Sidebar/>
             </div>
             <div className='main'>
                   <Routes>
                        <Route path="/export-products" element={<Export/>}/>
                        <Route path="/mineral-resource" element={<Mineral/>}/>
                        <Route path="/real-estate" element={<Estate/>}/>
                        <Route path="/local-products" element={<Local/>}/>
                        <Route path="/" element={<Main/>}/>
                   </Routes>               
             </div>
        </div>
    </>
  )
}


