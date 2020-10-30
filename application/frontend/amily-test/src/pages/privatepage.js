import React from 'react';
import { Switch, Route, Link, Redirect} from 'react-router-dom';
import FirePage from './pages/firepage';
import CovidPage from './pages/covidpage';

// {isLoggedIn && (
//     <div>
//         <Switch>
//             <Route path = "/Fire" component ={FirePage}/>
//             <Route path = "/Covid" component ={CovidPage}/>
//         </Switch>
//     </div>
// )}
// {!isLoggedIn && (
//     <div>
//         <Redirect to = "/3gfsd3t"/>
//     </div>
// )}

const PrivatePage = () => {
    return (
        <div>

        </div>
    );

}

export default PrivatePage;