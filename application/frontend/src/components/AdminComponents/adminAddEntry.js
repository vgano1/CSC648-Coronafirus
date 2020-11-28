import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const AdminAddEntry = () => {

    const information = useSelector(state => state.userReducer.information);  
    const [ newFires, setNewFires ] = useState([]); 

    useEffect(() => {
        axios.get('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/new-fires', {
            params: {
                'aid': information['AID']
            }
        })
        .then((res) => {
            setNewFires(res.data);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
      }, []);

      const approve = (fire_add_id, approved , i) => {
          let data = {
            'update_id': fire_add_id,
            'aid': information['AID'],
            'approve': approved,
          };
          axios.post('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/approve-add-fire/', data)
          .then((res) => {
            setNewFires(newFires.filter(item => item['fire_add_id'] !== fire_add_id));
            console.log(res);
          })
          .catch(e => {
              console.log(e);
          });
    
      };

      const useStyles = makeStyles({
        table: {
          minWidth: 200,
        },
      });

    const renderTable = () => {
      //rEA4gsJxKS0XlubLCRvbUPI0yXiomjUb
        return newFires.map((row, i) => {
          return (
            <TableRow key={i}>
              <TableCell component="th" scope="row" align="center">{row.incident_name}</TableCell>
              <TableCell align="center">{row.incident_county}</TableCell>
              <TableCell align="center">{row.incident_location}</TableCell>
              <TableCell align="center">{row.incident_acres_burned}</TableCell>
              <TableCell align="center">{row.incident_containment}</TableCell>
              <TableCell align="center">{row.is_active}</TableCell>
              <TableCell align="center">{row.incident_date_created}</TableCell>
              <TableCell align="center">{row.incident_cooperating_agencies}</TableCell>
              <TableCell align="center"><Button onClick={() => {approve(row.fire_add_id, true)}} variant="contained" >Approve</Button></TableCell>
              <TableCell align="center"><Button onClick={() => {approve(row.fire_add_id, false)}} variant="contained">Disapprove</Button></TableCell>
            </TableRow>
          )
        })
      }
    
      const classes = useStyles();
      return (
        <TableContainer component={Paper} spacing={1} justify="center" style={{position: "center"}}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>Fire Name</b></TableCell>
                <TableCell align="center"><b>County</b></TableCell>
                <TableCell align="center"><b>Location&nbsp;</b></TableCell>
                <TableCell align="center"><b>Acres Burned&nbsp;</b></TableCell>
                <TableCell align="center"><b>Containment&nbsp;</b></TableCell>
                <TableCell align="center"><b>Active&nbsp;</b></TableCell>
                <TableCell align="center"><b>Date Created&nbsp;</b></TableCell>
                <TableCell align="center"><b>Cooperating Agencies&nbsp;</b></TableCell>
                <TableCell align="center"><b>Approve&nbsp;</b></TableCell>
                <TableCell align="center"><b>Deny&nbsp;</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTable()}
            </TableBody>
          </Table>
        </TableContainer>
      );
};
export default AdminAddEntry;