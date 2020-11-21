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
        const newResult = result.filter(item => item.alertID !== alertID);
        console.log(newResult)
        const temp = [...result];
        temp.splice(i,1)
        console.log(temp)
    }, []);

    console.log(result);
    
    const approve = (alertID, approved, i) => {
        console.log(alertID, approved, i);
        let data = {
            'aid': information['AID'],
            'alertID': alertID,
            'approve': approved,
        };
        axios.post('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/send-alert/', data)
        .then((res) => {
            console.log(res) // !!!
            // data = res.data; //
            console.log(result);
            const temp = [...result];
            temp.splice(i,1)
            // setResjl 
            setResult(newResult);
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

    const renderTable = () => {
      //rEA4gsJxKS0XlubLCRvbUPI0yXiomjUb
        console.log(result.filter(item => item.alertID !== "rEA4gsJxKS0XlubLCRvbUPI0yXiomjUb"));
        return result.map((row, i) => {
          return (
            <TableRow key={i}>
              <TableCell component="th" scope="row" align="center">{row.alert_type}</TableCell>
              <TableCell align="center">{row.County}</TableCell>
              <TableCell align="center">{row.message}</TableCell>
              <TableCell align="center">{row.Dates}</TableCell>
              <TableCell align="center"><Button onClick={() => {approve(row.alert_id, true , i)}} variant="contained" >Approve</Button></TableCell>
              <TableCell align="center"><Button onClick={() => {approve(row.alert_id, false, i)}} variant="contained">Disapprove</Button></TableCell>
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
                <TableCell align="center"><b>Alert Type</b></TableCell>
                <TableCell align="center"><b>County</b></TableCell>
                <TableCell align="center"><b>Message&nbsp;</b></TableCell>
                <TableCell align="center"><b>Date&nbsp;</b></TableCell>
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
export default AdminAlert;