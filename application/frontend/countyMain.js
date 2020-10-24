import React from 'react';
const CountyMain = () => {
    const [result, setResult] = React.useState(null);
    React.useEffect(() => {
        //need account's county area and name
        let countyArea;
        let name;
        fetch('http://localhost:5000/coronavirus/countie/')
        .then(res => res.json())
        .then(resData => {
            console.log(resData);
            setResult(resData);
        })
        .catch((e) => {
            console.log(e);
            setResult("None");
        });

    });

    return (
        <div>
            <div class="top-right">
                <div>Show name and associate county/area</div>
                <div>name</div>
                <div>{result.Admin2}</div>
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