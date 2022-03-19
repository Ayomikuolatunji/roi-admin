import React from 'react'
import Header from './components/Header'
import {  Switch, Route } from "react-router-dom";
import Sidebar from './components/layout/Sidebar';
import Main from './components/layout/Main';
import Estate from './components/util/Estate';
import Mineral from './components/util/Mineral';
import Local from "./components/util/Local"
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
                  <Switch>
                    <Route path="/" component={Main}/>
                    <Route path="/export-products" component={Main}/>
                    <Route path="/mineral-resources" component={Main}/>
                    <Route path="/realestate" component={Main}/>
                  </Switch>
             </div>
        </div>
    </>
  )
}


