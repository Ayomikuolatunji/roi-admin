import React from 'react'
import Header from './components/Header'
import { Switch, Route } from "react-router-dom";
import Sidebar from './components/layout/Sidebar';
import Main from './components/layout/Main';
import Estate from './components/util/Estate';
import Mineral from './components/util/Mineral';
import Local from "./components/util/Local"
import "./app.css"
import Export from './components/util/Export';
import ImgSlider from './components/util/ImgSlider';
import Other from './components/util/Other';


export default function app() {
  return (
    <>
       <Header/>
       <div className='app'>
             <div  className='sidebar'>
                <Sidebar/>
             </div>
             <div className='main'>
                  <Switch>
                    <Route path="/export-products" component={Export}/>
                    <Route path="/mineral-resource" component={Mineral}/>
                    <Route path="/real-estate" component={Estate}/>
                    <Route path="/local-products" component={Local}/>
                    <Route path="/img-slider" component={ImgSlider}/>
                    <Route path="/other-product" component={Other}/>
                    <Route path="/" component={Main}/>
                  </Switch>
             </div>
        </div>
    </>
  )
}


