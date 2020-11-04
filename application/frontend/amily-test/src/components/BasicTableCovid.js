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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const BasicTable = (props) => {
  // const myCounty= useSelector(state =>({
  //   information: state.userReducer.information
  //   }));
  //   console.log(myCounty);

  // const url = 'http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/wildfire/countie/' + myCounty.information['countie'];

  // const [result, setResult] = useState([]);
    const myCounty = useSelector(state => ({
      information: state.userReducer.information
    }));
    const information = useSelector(state => state.userReducer.information); //for comparison, the original wayyyy

  const [confirmed, setConfirmed] = React.useState(0);
  const [recovered, setRecovered] = React.useState(0);
  const [death, setDeath] =  React.useState(0);

  useEffect(() => {
    let newConfirmed = props.result[0].Confirmed;
    let newRecovered = props.result[0].Deaths;
    let newDeaths = props.result[0].Recovered;
    setConfirmed(newConfirmed);
    setDeath(newDeaths);
    setRecovered(newRecovered);
  }, [])

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const updateData = () => {
    axios.post('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/update-covid/', {
      "confirmed": confirmed,
      "death": death,
      "recovered": recovered,
      "countie": myCounty.information['countie']
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const handleChangeConfirmed = (event) => {
    let newConfirmed = confirmed;
    newConfirmed = parseInt(event.target.value);
    setConfirmed(newConfirmed);
  };
  const handleChangeDeaths = (event) => {
    let newDeaths = death;
    newDeaths = parseInt(event.target.value);
    setDeath(newDeaths);
    console.log(death);
  };
  const handleChangeRecovered = (event) => {
    let newRecovered = recovered;
    newRecovered = parseInt(event.target.value);
    setRecovered(newRecovered);
    console.log(recovered);
  };

  const renderTable = () => {
    return props.result.map( (row) => {
      return (
        <TableRow>
          <TableCell component="th" scope="row">{row.Admin2}</TableCell>
          <TableCell align="center">{row.Province_State}</TableCell>
          <TableCell align="center">{row.Country_Region}</TableCell>
          <TableCell align="center"><TextField required id="standard-required" label="Required" defaultValue={row.Confirmed} onChange={(e) => handleChangeConfirmed(e)}/></TableCell>
          <TableCell align="center"><TextField required id="standard-required" label="Required" defaultValue={row.Deaths} onChange={(e) => handleChangeDeaths(e)}/></TableCell>
          <TableCell align="center"><TextField required id="standard-required" label="Required" defaultValue={row.Recovered} onChange={(e) => handleChangeRecovered(e)}/></TableCell>
          <TableCell align="center">{row.Active}</TableCell>
          <TableCell align="center">{row.Incidence_Rate}</TableCell>
          <TableCell align="center">{row["Case-Fatality_Ratio"]}</TableCell>
          <Button variant="contained" onClick={() => updateData()}>Update</Button>
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
            <TableCell align="center"><b>Country&nbsp;</b></TableCell>
            <TableCell align="center"><b>Confirmed&nbsp;</b></TableCell>
            <TableCell align="center"><b>Deaths&nbsp;</b></TableCell>
            <TableCell align="center"><b>Recovered&nbsp;</b></TableCell>
            <TableCell align="center"><b>Active&nbsp;</b></TableCell>
            <TableCell align="center"><b>Incidence Rate&nbsp;</b></TableCell>
            <TableCell align="center"><b>Case Fatality Ratio&nbsp;</b></TableCell>
            <TableCell align="center"><b>Upload&nbsp;</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderTable()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable;