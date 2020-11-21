import React from 'react';

function DataView({results, caGovApi, mode}) {

    const colorTier = (tier) => {
        switch(tier) {
            case "1":
                return { backgroundColor: "#900C3F"};
                break;
            case "2":
                return { backgroundColor: "#B70E00"};
                break;
            case "3":
                return { backgroundColor: "#FF5733"};
                break;
            case "4":
                return { backgroundColor: "#F0B904"};
                break;
            default:
                return { backgroundColor: "white"};
        }
    }

    return (
        <div className="resultPage gridcontainer">
            {results && mode &&
            <div>
            <div className="banner">
                <h1 style={{padding: "0.5em 0"}}>{results[0].incident_county}</h1>
            </div>
            {results.map((item, index) => {
                return (
                    <div className="item griditem" key={index}>
                        <h2>{item.incident_name}</h2>
                        <p>Acres burned: {item.incident_acres_burned}</p>
                        <p>Containment: {item.incident_acres_burned}</p>
                        <p>Cooperating Agencies: {item.incident_cooperating_agencies}</p>
                    </div>
                )
            })}
            </div>
            }

            {results && !mode && caGovApi &&
                <div className="item">
                    <div className="banner" style={colorTier(caGovApi.result.records[0]["FINAL TIER FOR 11/16"])}>
                        <h1>{results[0].Admin2}</h1>
                        <h2>Tier: {caGovApi.result.records[0]["FINAL TIER FOR 11/16"]}</h2>
                    </div>
                    <div className="content">
                        <h4>Confirmed Cases: {results[0].Confirmed}</h4>
                        {/* <p>Recovered: {results[0].Recovered}</p> */}
                        <p>Active: {results[0].Active}</p>
                        <p>Deaths: {results[0].Deaths}</p>
                        <p>Population Size: {caGovApi.result.records[0]["Pop Size"]}</p>
                        <br />
                        <p>Adjusted Case Rate (per 100,000): {caGovApi.result.records[0]["Adjusted Case Rate"]}</p>
                        <p>Unadjusted Case Rate (per 100,000): {caGovApi.result.records[0]["Unadjusted Case Rate per 100,000, excl prisons (4 day lag)"]}</p>
                        <p>Incidence Rate: {results[0].Incidence_Rate}</p>
                    </div>
                </div>
            }

            {!results && !mode &&
            <div className="item">
            <h3>No Covid Data Available for this County!</h3>
            </div>
            }

            {!results && mode &&
            <div className="item">
            <h3>No Fires in the selected County!</h3>
            </div>
            }
        </div>
    );
}

export default DataView;
