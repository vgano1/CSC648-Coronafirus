import React from 'react';
const FireAlertSubmit = () => {
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
            <div class="top-right">
                <div>Show name and associate county/area</div>
                <div className = "director-name">{result.name}</div>
                <div className = "county-area">County Area : {result.incident_county}</div>
            </div>
            <div>
                <form action="" method="POST" class="form-alert-submit" onsubmit="" encType="application/x-www-form-urlencoded">
    
                    <label for="fireAlert">Details for Evacuation: </label>
                    <textarea id="fireAlert"cols="50" rows="10"></textarea>

                    <label for="addInfo">Additional Information on the severity and danger: </label>
                    <textarea id="addInfo" cols="50" rows="10"></textarea>

                    <input type="submit"></input>
                </form>
            </div>
        </div>
        );
    } 
export default FireAlertSubmit;