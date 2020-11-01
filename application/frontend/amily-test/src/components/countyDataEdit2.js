import React from 'react';
import axios from 'axios';
//import CountyDataEdit from '../components/countyDataEdit';

const CountyDataEdit2 = () => {
    const [result, setResult] = React.useState({});
    const [confirmed, setConfirmed] = React.useState(0);
    const [death, setDeath]  = React.useState(0);
    const [recovered, setRecovered]  = React.useState(0);
    const [countie,setCountie] = React.useState('');

    const updateConfirmed= (g)=>{
        console.log(g.target.value);
        setConfirmed(parseInt(g.target.value));
    };
    const updateDeath= (g)=>{
        setDeath(parseInt(g.target.value));
    };
    const updateRecovered= (g)=>{
        setRecovered(parseInt(g.target.value));
    };
    const updateCountie= (g)=>{
        setCountie(g.target.value);
    };

    const submit1 = () =>{
        const data = {
            'confirmed': confirmed,
            'countie': countie,
            'death': death,
            'recovered': recovered
            
        };
        console.log(data);
        axios.post('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/update-covid/', data)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    React.useEffect(() => {
        //need account's county area and name
        let countyArea;
        let name;
        fetch('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/director-countie-covid/?did=1')
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
                <div>Name: {result.Name}</div>
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
                
                <div>
                    <div>change/update data and stat WIP</div>
                    <div>
                        
                        <label for = "confirmed">Confirmed : </label>
                        <input type ="number" name="confirmed" value={confirmed} onChange ={updateConfirmed}></input>
    
                        <label for = "death"> Deaths : </label>
                        <input type ="number" name="death" value={death} onChange ={updateDeath}></input>
    
                        <label for = "recovered">Recovered : </label>
                        <input type ="number" name="recovered" value={recovered} onChange ={updateRecovered}></input>
                        
                        <label for = "countie">County :</label>
                        <input type ="text" name="countie" value={countie} onChange ={updateCountie}></input>
    
                        <div class="button-data-edit"></div>
                            <button type="submit" onClick = {submit1}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default CountyDataEdit2;