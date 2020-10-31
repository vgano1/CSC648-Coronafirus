import React from 'react';
import FireDataEdit from '../components/fireDataEdit'

const FireDataEdit2 = () => {
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

                <FireDataEdit></FireDataEdit>

            </div>

        </div>
    );

}

export default FireDataEdit2;