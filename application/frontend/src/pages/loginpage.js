import React from 'react';
import Login from '../components/login'
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

{/* <Switch>
{isLoggedIn && userType === 'Covid' && (
    <Redirect from = "/login" to = "/Covid"/>
)}
{isLoggedIn && userType === 'Fire' && (
    <Redirect from = "/login" to = "/Fire"/>
)}
{isLoggedIn && userType === 'Admin' && (
    <Redirect from = "/login" to = "/"/>
)}
{!isLoggedIn && (
   <Login></Login>
)}
</Switch> */}
 const LoginPage = () => {
     const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
     const userType = useSelector(state => state.userReducer.userType);
     if(isLoggedIn){
        if(userType === 'Covid'){
            return (<Redirect from = "/login" to = "/Covid"/>);
        }
        else if (userType === 'Fire'){
            return (<Redirect from = "/login" to = "/Fire"/>);
        }
        else if (userType === 'Admin'){
           return (<Redirect from = "/login" to = "/Admin"/>);
        }
     }
    return (
        <div>
            {!isLoggedIn && (<Login></Login>)}
        </div>
    );
 }

 export default LoginPage;