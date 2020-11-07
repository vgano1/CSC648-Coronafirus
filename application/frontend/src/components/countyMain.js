import React from 'react';
import { useSelector } from 'react-redux';

const CountyMain = () => {
    //county data and stats info
    const [result, setResult] = React.useState({});
    //user info
    const information = useSelector(state => state.userReducer.information);

    //need account's county area and name
    let countyArea = information.countie;
    let name = information.name;

    React.useEffect(() => {
        fetch('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/coronavirus/countie/' + countyArea)
        .then(res => res.json())
        .then(resData => {
            console.log(resData[0]);
            setResult(resData[0]);
        })
        .catch((e) => {
            console.log(e);
            setResult("None");
        });

    }, []);

    return (
        <div>
            <div class="top-right">
                <div>Show name and associate county/area</div>
                <div>Name : {name}</div>
                <div>County : {countyArea}</div>
            </div>

            <div class = "left">
                <div class = "curStat">Current statistics and data</div>
                <a href="">data and stat changes</a>
                <a href="">shelter in place request</a>
            </div>

            <div class="right">
                <div class = "map">MAP</div>
                <div class = "filter">Filter options</div>
            </div>
        </div>
    );

}
export default CountyMain;