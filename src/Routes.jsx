import React from 'react'
import { Switch, Route } from 'react-router'

import UserCrud from './UserCrud'
import Home from './Home'


export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />        
    </Switch>