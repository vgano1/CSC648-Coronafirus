import React from 'react';
import CountyAlertSubmit from '../components/countyAlertSubmit';
import CountyDataEdit from '../components/countyDataEdit';
import CountyMain from '../components/countyMain';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
const CovidPage = () => {
    let {path, url} = useRouteMatch();

    return (
        <div>
            <nav>
                <Link to = {`${url}/main`}>Main</Link>
                <Link to = {`${url}/alert`}>Alert</Link>
                <Link to = {`${url}/dataedit`}>Data Edit</Link>
            </nav>
            <Switch>
                <Route path = {`${path}/main`} component ={CountyMain}/>
                <Route path = {`${path}/alert`} component ={CountyAlertSubmit}/>
                <Route path ={`${path}/dataedit`} component ={CountyDataEdit}></Route>
            </Switch>
        </div>
    );

}
export default CovidPage;