import React from 'react'
import {List} from "./List";
import {Switch, Route, Redirect} from 'react-router-dom'
import {Form} from "./Form";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact>
                <List/>
            </Route>
            <Route path="/form" exact>
                <Form/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}