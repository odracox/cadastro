import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import React from 'react'
import {BrowserRouter} from 'react-router-dom' 
import './App.css'


import Nav from './Nav'
import Routes from './Routes'

export default props =>

        <BrowserRouter>
                
                <div className="app">
                        <Nav />
                        <Routes />
                </div>

        </BrowserRouter>
