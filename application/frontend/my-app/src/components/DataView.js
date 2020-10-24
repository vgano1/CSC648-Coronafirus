import React from 'react';

function DataView({results, mode}) {

    return (
        <div className="resultPage gridcontainer">
            {results && mode &&
            results.map((item, index) => {
                return (
                    <div className="item griditem" key={index}>
                    <h3>{item.incident_name}</h3>
                    <h4>{item.incident_county}</h4>
                    <p>Acres burned: {item.incident_acres_burned}</p>
                    <p>Containment: {item.incident_acres_burned}</p>
                    <p>Cooperating Agencies: {item.incident_cooperating_agencies}</p>
                    </div>
                )
            })}
            
            {results && !mode &&
            results.map((item, index) => {
                return (
                    <div className="item griditem" key={index}>
                    <h3>{item.Admin2}</h3>
                    <h4>Confirmed Cases: {item.Confirmed}</h4>
                    <p>Recovered: {item.Recovered}</p>
                    <p>Active: {item.Active}</p>
                    <p>Deaths: {item.Deaths}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default DataView;
