import React from 'react';
const FireDataEdit = () => {
    const [result, setResult] = React.useState(null);
    React.useEffect(() => {
        //need account's county area
        let countyArea;
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
                <div className = "county-area">County Area : {result.incident_county}</div>
            </div>
            <div className = "middle">

                <div className = "county-info-stat">
                    <div>Location : {result.incident_location}</div>
                    <div>Acres Burned : {result.incident_acres_burned}</div>
                    <div>Containment : {result.incident_containment}</div>
                    <div>Control : {result.incident_control}</div>
                    <div>Corporating Agencies : {result.incident_cooperating_agencies}</div>
                    <div>Incident Type : {result.incident_type}</div>
                    <div>Active : {result.is_active}</div>
                    <div>Date Created : {result.incident_dateonly_created}</div>
                    <div>Date Extinguished : {result.incident_dateonly_extinguished}</div>
                </div>
                <div>Change/Update Data</div>
                 
                <form action = "" method = "POST" className = "form-data-edit" onsubmit = "" encType = "application/x-www-form-urlencoded">
        
                    <label for="evacLevel">Evacuation Level</label>
                    <select id="evacLevel" >
                        <option value="1" selected>L1</option>
                        <option value="2">L2</option>
                        <option value="3">L3</option>
                    </select>
                    <div className ="button-data-edit">
                        <input type = "submit"></input>
                    </div>
                </form>

            </div>

        </div>
    );

}

export default FireDataEdit;