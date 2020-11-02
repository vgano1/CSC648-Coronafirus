import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import userReducer from '../redux/reducers/userReducer'
import { useSelector } from 'react-redux'

const TableUpdate = () => {
  const url = 'http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/wildfire/countie/Napa';

  const [result, setResult] = useState([]);

  useEffect(() => {
    axios.get(url)
    .then((res) => {
      console.log(res.data[0]);
      setResult(res.data)
    });
    
  }, [])

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const myDID = useSelector(state =>({
    information: state.userReducer.information
    }));
    console.log(myDID);

  const renderTable = () => {
    return result.map( row => {
            return (
              <TableRow>
                <TableCell component="th" scope="row">{row.incident_name}</TableCell>
                <TableCell align="center">{row.incident_county}</TableCell>
                <TableCell align="center">{row.incident_location}</TableCell>
                <TableCell align="center">{row.incident_acres_burned}</TableCell>
                <TableCell align="center">{row.incident_containment}</TableCell>
                <TableCell align="center">{row.is_active}</TableCell>
                <TableCell align="center">{row.incident_dateonly_created}</TableCell>
                <TableCell align="center">{row.incident_dateonly_extinguished}</TableCell>
              </TableRow>
            )
    })
  }

  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{marginTop: 100, position: "center"}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Fire Name</b></TableCell>
            <TableCell align="center"><b>County</b></TableCell>
            <TableCell align="center"><b>Location&nbsp;</b></TableCell>
            <TableCell align="center"><b>Acres Burned&nbsp;</b></TableCell>
            <TableCell align="center"><b>Containment&nbsp;</b></TableCell>
            <TableCell align="center"><b>Active&nbsp;</b></TableCell>
            <TableCell align="center"><b>Date Created&nbsp;</b></TableCell>
            <TableCell align="center"><b>Date Extinguished&nbsp;</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderTable()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableUpdate;