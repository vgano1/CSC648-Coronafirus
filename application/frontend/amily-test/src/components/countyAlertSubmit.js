import React from 'react';
const CountyAlertSubmit = () => {
    const [result, setResult] = React.useState({});
    React.useEffect(() => {
        //need account's county area
        let countyArea;
        fetch('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/coronavirus/countie/Napa')
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
                <div>{result.name}</div>
                <div>{result.Admin2}</div>
            </div>
            <div class="middle">
                <form action="" method="POST" class="form-alert-submit" onsubmit="" enctype="application/x-www-form-urlencoded">
                    
                    <label for="info">Field for info and instructions for shelter in place</label>
                    <textarea id="info"cols="50" rows="10"></textarea>

                    <label for="addInfo">Additional Information</label>
                    <textarea id="addInfo" cols="50" rows="10"></textarea>

                    <input type="submit"></input>
                </form>
            </div>
        </div>
    );
}
export default CountyAlertSubmit;