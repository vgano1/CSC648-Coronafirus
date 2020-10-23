import React from 'react';
const FireAlertSubmit = () => {
    const [result, setResult] = React.useState(null);
    React.useEffect(() =>{
        //need account's county area and name
        let name;
        let county;
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

        return (
        <div>
            <div class="top-right">
                <div>Show name and associate county/area</div>
                <div className = "director-name">{result.name}</div>
                <div className = "county-area">County Area : {result.incident_county}</div>

            </div>
            <div>
                <form action="" method="POST" class="form-alert-submit" onsubmit="" enctype="application/x-www-form-urlencoded">
    
                    <label for="fireAlert">Details for Evacuation: </label>
                    <textarea id="fireAlert"cols="50" rows="10"></textarea>

                    <label for="evacLevel">Evacuation Level</label>
                    <select id="evacLevel" >
                        <option value="1" selected>L1</option>
                        <option value="2">L2</option>
                        <option value="3">L3</option>
                    </select>

                    <label for="addInfo">Additional Information on the severity and danger: </label>
                    <textarea id="addInfo" cols="50" rows="10"></textarea>

                    <input type="submit"></input>
                </form>
            </div>
        </div>
        );

    });
} 
export default FireAlertSubmit;