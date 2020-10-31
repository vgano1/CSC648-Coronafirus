import React from 'react';
import CountyAlertSubmit from '../components/countyAlertSubmit';
import CountyDataEdit2 from '../components/countyDataEdit2';
import CountyMain from '../components/countyMain';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
const CovidPage = ({info}) => {
    let {path, url} = useRouteMatch();
    console.log(info);
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
                <Route path ={`${path}/dataedit`} component ={CountyDataEdit2}></Route>
            </Switch>
        </div>
    );

}
export default CovidPage;