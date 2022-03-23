import React from 'react'
import Header from './components/Header'
import { Routes ,Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Main from './components/layout/Main';
import Estate from './components/util/Estate';
import Mineral from './components/util/Mineral';
import Local from "./components/util/Local"
import Export from './components/util/Export';
import ImgSlider from './components/util/ImgSlider';
import Other from './components/util/Other';
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
                        <Route path="/img-slider" element={<ImgSlider/>}/>
                        <Route path="/other-product" element={<Other/>}/>
                        <Route path="/" element={<Main/>}/>
                   </Routes>               
             </div>
        </div>
    </>
  )
}


