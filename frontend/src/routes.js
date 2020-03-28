import { BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";

//Componentes
import Logon from './pages/Logon/index'
import Register from './pages/Register/index'
import Profile from './pages/Profile/index'
import NewIncident from './pages/NewIncident/index'


export default function Routes()
{
    return(
        <BrowserRouter>
        <Switch>
            < Route path="/" exact  component={Logon}/> 
            < Route path="/profile" component={Profile}/> 
            < Route path="/register"component={Register}/> 
            < Route path="/incidents/new"component={NewIncident}/> 
            </Switch>
        </BrowserRouter>
    )
};