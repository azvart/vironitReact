import React from 'react';
import {Route,Redirect,RouteProps} from 'react-router-dom';
import {authService} from '../service/authService';

interface PrivateRouteProps extends RouteProps{
    children?:any,
    component?:any
}

const PrivateRoute =(props:PrivateRouteProps)=>{
    const{component: Component,children,...rest} = props;
    const currentUser = authService.currentUserValue; 
    return(
        <Route
        {...rest}
        render={routeProps=>
        currentUser ? (
            Component ? (
                <Component {...props} />
            ):(
                children
            )
        ):(
            <Redirect to={{pathname:'/',state:{from:routeProps.location},}} />
        )
        }
        />
    )
}


export default PrivateRoute;