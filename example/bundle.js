import React, {Component} from 'react'
import {render} from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import Basic from './Basic'
import Readonly from './Readonly'
import Views from './Views'
import CustomHeader from './CustomHeader'
import CustomEventStyle from './CustomEventStyle'
import AddResource from './AddResource'
import DragAndDrop from './DragAndDrop'
import Summary from './Summary'
import AddMore from './AddMore'
import OverlapCheck from './OverlapCheck'
import NoCrossSlotMove from './NoCrossSlotMove'
import FreezeFirstRow from './FreezeFirstRow'
import ResourceClickable from './ResourceClickable'
import ComingSoon from './ComingSoon'
/*
<Route path="/readonly" component={Readonly}/>
<Route path="/views" component={Views}/>
<Route path="/customheader" component={CustomHeader}/>
<Route path="/customeventstyle" component={CustomEventStyle} />
<Route path="/addresource" component={AddResource} />
<Route path="/draganddrop" component={DragAndDrop} />
<Route path="/summary" component={Summary} />
<Route path="/addmore" component={AddMore} />
<Route path="/overlapcheck" component={OverlapCheck} />
<Route path="/nocrossslotmove" component={NoCrossSlotMove} />
<Route path="/freezefirstrow" component={FreezeFirstRow} />
<Route path="/resourceclickable" component={ResourceClickable} />
<Route path="/comingsoon" component={ComingSoon}/>
*/
render((
    <Router history={hashHistory}>
        <Route path="/" component={Basic}/>
    </Router>
), document.getElementById('root'))

