import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AdminDataEdit = () => {
    const information = useSelector(state => state.userReducer.information);  

    const [fireResult, setfireResult] = React.useState([]);
    const [covidResult, setCovidResult] = React.useState([]);

    React.useEffect(() => {
        console.log(information['AID'])
        axios.get('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/fire-updates/', {
            params: {
                aid: information['AID']
              }
        })
        .then(res => {
            console.log(res);
            setfireResult(res.data);
        })
        .catch((e)=> {
            console.log(e);
        });
        axios.get('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/covid-updates/', {
            params: {
                aid: information['AID']
              }
        })
        .then(res => {
            console.log(res);
            setCovidResult(res.data);
        })
        .catch((e)=> {
            console.log(e);
        });
    }, []);
    
    const approveFire = (update_id, approved) => {
        console.log(update_id, approved);
        let data = {
            'update_id': update_id,
            'aid': information['AID'],
            'approve': approved,
        };
        axios.post('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/approve-fire/', data)
        .then((res) => {
            console.log(res) // !!!
            // data = res.data; //
        })
        .catch((e)=> {
            console.log(e) // !!!
        });
    };

    const approveCovid = (update_id, approved) => {
        console.log(update_id, approved);
        let data = {
            'update_id': update_id,
            'aid': information['AID'],
            'approve': approved,
        };
        axios.post('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/approve-covid/', data)
        .then((res) => {
            console.log(res) // !!!
            // data = res.data; //
        })
        .catch((e)=> {
            console.log(e) // !!!
        });
    };
    // const deny = () => {
        
    // }

    return (
        <div>
            {fireResult.map((row, i) => {
                return (
                <div key={i}>
                    { row.fire_name + " | " + row.incident_acres_burned + " | " + row.update_id }
                    <Button onClick={() => {approveFire(row.update_id, true)}} variant="contained" >Approve</Button>
                    <Button onClick={() => {approveFire(row.update_id, false)}} variant="contained">Disapprove</Button>
                </div>
            )})}
            {covidResult.map((row, i) => {
                return (
                <div key={i}>
                    { row.countie + " | " + row.Confirmed + " | " + row.Recovered + " | " + row.death + " | " + row.Update_id }
                    <Button onClick={() => {approveCovid(row.Update_id, true)}} variant="contained" >Approve</Button>
                    <Button onClick={() => {approveCovid(row.Update_id, false)}} variant="contained">Disapprove</Button>
                </div>
            )})}
        </div>

    );
}

export default AdminDataEdit;