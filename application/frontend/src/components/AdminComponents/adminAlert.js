import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AdminAlert = () => {

    const information = useSelector(state => state.userReducer.information);  

    const [result, setResult] = React.useState([]);
    React.useEffect(() => {
        // console.log(information['AID'])
        axios.get('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/get-alerts/', {
            'aid': information['AID']
        })
        .then(res => {
            console.log(res);
            setResult(res.data);
        })
        .catch((e)=> {
            console.log(e);
        });
    }, []);
    
    const approve = (alertID, approved) => {
        console.log(alertID, approved);
        let data = {
            'aid': information['AID'],
            'alertID': alertID,
            'approve': approved,
        };
        axios.post('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/send-alert/', data)
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
            {result.map((row, i) => {
                return (
                <div key={i}>
                    {row.alert_type + " | " + row.County + " | " + row.message + " | " + row.Dates}
                    <Button onClick={() => {approve(row.alert_id, true)}} variant="contained" >Approve</Button>
                    <Button onClick={() => {approve(row.alert_id, false)}} variant="contained">Disapprove</Button>
                </div>
            )})}
        </div>

    );

};
export default AdminAlert;