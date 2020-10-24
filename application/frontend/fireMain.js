import React from 'react';
const FireMain = () => {
    const [result, setResult] = React.useState(null);
    React.useEffect(() => {
        //need account's fire county area and name
        let countyArea;
        let name;
        fetch('http://localhost:5000/wildfire/countie/')
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
            <div className="top-right">
                <div>name</div>
                <div className = "county-area">County Area : {result.incident_county}</div>
            </div>
            
            <div class = "left">
                <div class = "curStat">Current statistics and data</div>
                <a href="">Data and stat changes</a>
                <a href="">Evacuation request</a>
            </div>

            <div class="right">
                <div class = "map">MAP</div>
                <div class = "filter">Filter options</div>
            </div>

        </div>
    );
}
export default FireMain;