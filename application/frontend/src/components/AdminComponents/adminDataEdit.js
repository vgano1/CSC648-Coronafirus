import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
            setfireResult(fireResult.filter(item => item['update_id'] !== update_id));
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
            setCovidResult(covidResult.filter(item => item['Update_id'] !== update_id));
        })
        .catch((e)=> {
            console.log(e) // !!!
        });
    };
    // const deny = () => {
        
    // }

    const useStyles = makeStyles({
        table: {
          minWidth: 200,
        },
      });

    const renderTable1 = () => {
        return fireResult.map((row, i) => {
          return (
            <TableRow key={i}>
              <TableCell component="th" scope="row" align="center">{row.fire_name}</TableCell>
              <TableCell align="center">{row.incident_acres_burned}</TableCell>
              <TableCell align="center">{row.incident_containment}</TableCell>
              <TableCell align="center">{row.update_id}</TableCell>
              <TableCell align="center"><Button onClick={() => {approveFire(row.update_id, true)}} variant="contained" >Approve</Button></TableCell>
              <TableCell align="center"><Button onClick={() => {approveFire(row.update_id, false)}} variant="contained">Disapprove</Button></TableCell>
            </TableRow>
          )
        })
      }
      const renderTable2 = () => {
        return covidResult.map((row, i) => {
          return (
            <TableRow key={i}>
              <TableCell component="th" scope="row" align="center">{row.countie}</TableCell>
              <TableCell align="center">{row.Confirmed}</TableCell>
              <TableCell align="center">{row.Recovered}</TableCell>
              <TableCell align="center">{row.death}</TableCell>
              <TableCell align="center">{row.Update_id}</TableCell>
              <TableCell align="center"><Button onClick={() => {approveCovid(row.Update_id, true)}} variant="contained" >Approve</Button></TableCell>
              <TableCell align="center"><Button onClick={() => {approveCovid(row.Update_id, true)}} variant="contained">Disapprove</Button></TableCell>
            </TableRow>
          )
        })
      }
    
      const classes = useStyles();
    
      return (
        <div>
        <TableContainer component={Paper} spacing={1} justify="center" style={{position: "center"}}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>Fire Name</b></TableCell>
                <TableCell align="center"><b>Incident Acres Burned</b></TableCell>
                <TableCell align="center"><b>Incident Containment</b></TableCell>
                <TableCell align="center"><b>Update ID&nbsp;</b></TableCell>
                <TableCell align="center"><b>Approve&nbsp;</b></TableCell>
                <TableCell align="center"><b>Deny&nbsp;</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTable1()}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper} spacing={1} justify="center" style={{position: "center"}}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center"><b>County</b></TableCell>
                      <TableCell align="center"><b>Confirmed</b></TableCell>
                      <TableCell align="center"><b>Recovered&nbsp;</b></TableCell>
                      <TableCell align="center"><b>Deaths&nbsp;</b></TableCell>
                      <TableCell align="center"><b>Update ID&nbsp;</b></TableCell>
                      <TableCell align="center"><b>Approve&nbsp;</b></TableCell>
                      <TableCell align="center"><b>Deny&nbsp;</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {renderTable2()}
                  </TableBody>
                </Table>
        </TableContainer>
        </div>
      );
}

export default AdminDataEdit;