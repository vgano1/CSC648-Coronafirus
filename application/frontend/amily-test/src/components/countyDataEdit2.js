import React from 'react';
import CountyDataEdit from '../components/countyDataEdit';

const CountyDataEdit2 = () => {
    const [result, setResult] = React.useState({});
    React.useEffect(() => {
        //need account's county area and name
        let countyArea;
        let name;
        fetch('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/coronavirus/countie/Napa')
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
                <div>Name: Amily</div>
                <div>Current County: {result.Admin2}</div>
            </div>

            <div class = "middle">
                <div>Current Info:</div>
                <div>Confirmed : {result.Confirmed}</div>
                <div>Deaths : {result.Deaths}</div>
                <div>Recovered : {result.Recovered}</div>
                <div>Active : {result.Active}</div>
                <div>Incidence Rate : {result.Incidence_Rate}</div>
                <div>Case Fatality Ratio : {result['Case-Fatality_Ratio']}</div>
                {/* {console.log(result)} */}
                
                <CountyDataEdit></CountyDataEdit>
            </div>
        </div>
    );

}

export default CountyDataEdit2;