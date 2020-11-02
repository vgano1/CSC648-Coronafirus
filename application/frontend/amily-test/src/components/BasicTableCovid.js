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
import { useSelector } from 'react-redux'


const BasicTableCovid = () => {

  const myCounty= useSelector(state =>({
    information: state.userReducer.information
    }));
    console.log(myCounty);

  const url = 'http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/coronavirus/countie/' + myCounty.information['countie'];

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

  

  const renderTable = () => {
    return result.map( row => {
            return (
              <TableRow>
                <TableCell component="th" scope="row">{row.Admin2}</TableCell>
                <TableCell align="center">{row.Province_State}</TableCell>
                <TableCell align="center">{row.Confirmed}</TableCell>
                <TableCell align="center">{row.Deaths}</TableCell>
                <TableCell align="center">{row.Recovered}</TableCell>
                <TableCell align="center">{row.Active}</TableCell>
                <TableCell align="center">{row.Incidence_Rate}</TableCell>
                <TableCell align="center">{row["Case-Fatality_Ratio"]}</TableCell>
              </TableRow>
            )
    })
  }

  const classes = useStyles();

  return (
    <TableContainer component={Paper} spacing={3} justify="center" style={{position: "center"}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>County</b></TableCell>
            <TableCell align="center"><b>State</b></TableCell>
            <TableCell align="center"><b>Confirmed&nbsp;</b></TableCell>
            <TableCell align="center"><b>Deaths&nbsp;</b></TableCell>
            <TableCell align="center"><b>Recovered&nbsp;</b></TableCell>
            <TableCell align="center"><b>Active&nbsp;</b></TableCell>
            <TableCell align="center"><b>Incidence Rate&nbsp;</b></TableCell>
            <TableCell align="center"><b>Case Fatality Ratio&nbsp;</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderTable()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTableCovid;