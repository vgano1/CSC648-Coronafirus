import React from 'react';
import FireAlertSubmit from '../components/fireAlertSubmit';
import BasicTable from '../components/BasicTable';
import FireMain from '../components/fireMain';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
const FirePage = () => {
    let {path, url} = useRouteMatch();
    return (
        <div>
            <nav>
                <Link to = {`${url}/main`}>Main</Link>
                <Link to = {`${url}/alert`}>Alert</Link>
                <Link to = {`${url}/dataedit`}>Data Edit</Link>
            </nav>
            <Switch>
                <Route path = {`${path}/main`} component ={FireMain}/>
                <Route path = {`${path}/alert`} component ={FireAlertSubmit}/>
                <Route path = {`${path}/dataedit`} component ={BasicTable}></Route>
            </Switch>
        </div>
    );

}
export default FirePage;