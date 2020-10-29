import React from 'react';
const FireMain = () => {
    const [result, setResult] = React.useState({});
    React.useEffect(() =>{
        //need account's county area and name
        let name;
        let county;
        fetch('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/wildfire/countie/Napa')
        .then(res => res.json())
        .then(resData => {
            console.log(resData);
            setResult(resData[0]);
        })
        .catch((e) => {
            console.log(e);
            setResult("None");
        });
    }, []);
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