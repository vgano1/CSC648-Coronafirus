import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

export const PrivateRoute = (props) => {
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const userType = useSelector(state => state.userReducer.userType);

    //console.log(props);
    if(isLoggedIn){
        if(userType === 'Covid' || userType === "Fire" || userType ==='Admin' ){
            return (
                <Route path = {props.path} component = {props.component}/>
            );
        }
    }else {
        return(
            <Redirect to = "/login" />
        );
    }

};