import React from 'react';
import { useSelector } from 'react-redux';
const CountyAlertSubmit = () => {
    //county info
    const [result, setResult] = React.useState({});
    //user info
    const information  = useSelector(state =>state.userReducer.information);
    let countyArea = information.countie;
    let name = information.name;
    React.useEffect(() => {

        fetch('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/coronavirus/countie/'+ countyArea)
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
                <div> Name : {name}</div>
                <div>County : {countyArea}</div>
            </div>
            <div class="middle">
                <form action="" method="POST" className="form-alert-submit" onSubmit="" encType="application/x-www-form-urlencoded">
                    
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