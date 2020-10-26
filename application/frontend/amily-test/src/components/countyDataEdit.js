import React from 'react';

const CountyDataEdit = () => {
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
                <div>name</div>
                <div>{result.Admin2}</div>
            </div>

            <div class = "middle">
                <div>current Info and stat WIP</div>
                <div>Confirmed : {result.Confirmed}</div>
                <div>Deaths :  : {result.Deaths}</div>
                <div>Recovered : {result.Recovered}</div>
                <div>Active : {result.Active}</div>
                <div>Incidence Rate : {result.Incidence_Rate}</div>
                <div>Case Fatality Ratio : {result['Case-Fatality_Ratio']}</div>
                {/* {console.log(result)} */}

                <div>change/update data and stat WIP</div>
                <form action="" method="POST" class="form-data-edit" onsubmit="" enctype="application/x-www-form-urlencoded">
                    
                    <label for = "confirmed">Confirmed : </label>
                    <input id ="confirmed" type ="number"></input>

                    <label for = "deaths"> Deaths : </label>
                    <input id ="deaths" type ="number"></input>

                    <label for = "recovered">Recovered : </label>
                    <input id = "recovered" type ="number"></input>
                    
                    <div>Active : </div>
                    <input id = "active" type ="radio" value = "false" name = "active"></input>
                    <label for = "active">True</label>

                    <input id = "not-active" type ="radio" value = "true" name = "active"></input>
                    <label for = "not-active"> False</label>

                    <label for = "incidence_rate">Incidence Rate :</label>
                    <input id ="incidence rate" type = "text"></input>

                    <label for = "case_fatility_ratio">Case Fatality Ratio : </label>
                    <input id =  "case_fatility_ratio" type = "text"></input>

                    <label for="shelterLevel">Shelter in place Level</label>
                    <select id="shelterLevel" >
                        <option value="1" selected>L1</option>
                        <option value="2">L2</option>
                        <option value="3">L3</option>
                    </select>

                    <div class="button-data-edit">
                        <input type="submit"></input>
                    </div>
                </form>
            </div>
        </div>
    );

}
export default CountyDataEdit;