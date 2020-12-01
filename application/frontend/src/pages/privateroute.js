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
                <div>
                    <Route path = {props.path} component = {props.component}/>
                    <div className="main-footer foreground">SFSU Software Engineering Project CSC 648-848, Fall 2020. For Demonstration Only&nbsp;
                        <a className = "main-footer" href = 'http://portfolioaboutpage-env.eba-qz5xmt46.eu-west-3.elasticbeanstalk.com/'>About Us</a>
                    </div>
                </div>
            );
        }
    }else {
        return(
            <Redirect to = "/login" />
        );
    }

};