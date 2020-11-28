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

  const [acres, setAcres] = React.useState(Array(props.result.length));
  const [containment, setContainment] = React.useState(Array(props.result.length));

  useEffect(() => {
    let newAcres = acres;
    let newContainment = containment;
    for (let i = 0; i < props.result.length; i++) {
      newAcres[i] = [props.result[i].incident_name, props.result[i].incident_acres_burned];
    }
    for (let i = 0; i < props.result.length; i++) {
      newContainment[i] = [props.result[i].incident_name, props.result[i].incident_containment];
    }
    setAcres(newAcres);
    setContainment(newContainment);
  }, [])

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  // const initArray = () => {
  //   let newAcres = acres;
  //   for (let i = 0; i < props.result.length; i++) {
  //     newAcres[i] = props.result[i].incident_acres_burned;
  //   }
  //   setAcres(newAcres);
  // }

  const updateData = (i) => {
    axios.post('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/update-fire/', {
      "did": myCounty.information['DID'],
      "acres": acres[i][1],
      "fire_name": acres[i][0],
      "containment": containment[i][1]
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const handleChangeAcres = (event, i) => {
    let newAcres = acres;
    newAcres[i] = [props.result[i].incident_name, parseInt(event.target.value)];
    setAcres(newAcres);
    console.log(acres);
  };

  const handleChangeContainment = (event, i) => {
    let newContainment = containment;
    newContainment[i] = [props.result[i].incident_name, parseInt(event.target.value)];
    setContainment(newContainment);
    console.log(acres);
  }

  const renderTable = () => {
    return props.result.map( (row, i) => {
            return (
              <TableRow>
                <TableCell component="th" scope="row">{row.incident_name}</TableCell>
                <TableCell align="center">{row.incident_county}</TableCell>
                <TableCell align="center">{row.incident_location}</TableCell>
                <TableCell align="center"><TextField required id="standard-required" label="Required" defaultValue={row.incident_acres_burned} onChange={(e) => handleChangeAcres(e, i)}/></TableCell>
                <TableCell align="center"><TextField required id="standard-required" label="Required" defaultValue={row.incident_containment} onChange={(e) => handleChangeContainment(e,i)}/></TableCell>
                <TableCell align="center">{row.is_active}</TableCell>
                <TableCell align="center">{row.incident_dateonly_created}</TableCell>
                <TableCell align="center"><Button variant="contained" onClick={() => updateData(i)}>Update</Button></TableCell>
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
            <TableCell><b>Fire Name</b></TableCell>
            <TableCell align="center"><b>County</b></TableCell>
            <TableCell align="center"><b>Location&nbsp;</b></TableCell>
            <TableCell align="center"><b>Acres Burned&nbsp;</b></TableCell>
            <TableCell align="center"><b>Containment&nbsp;</b></TableCell>
            <TableCell align="center"><b>Active&nbsp;</b></TableCell>
            <TableCell align="center"><b>Date Created&nbsp;</b></TableCell>
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