import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import counties from './../counties';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Alert, AlertTitle } from '@material-ui/lab';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import { Redirect } from "react-router-dom";
const axios = require('axios');

const FireAlertSubmit = () => {


    // const useStyles = makeStyles((theme) => ({
    //     paper: {
    //       marginTop: theme.spacing(8),
    //       display: 'flex',
    //       flexDirection: 'column',
    //       alignItems: 'center',
    //     },
    //     avatar: {
    //       margin: theme.spacing(1),
    //       backgroundColor: theme.palette.secondary.main,
    //     },
    //     form: {
    //       width: '100%', // Fix IE 11 issue.
    //       marginTop: theme.spacing(3),
    //     },
    //     submit: {
    //       margin: theme.spacing(3, 0, 2),
    //     },
    //   }));

    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //       flexGrow: 2,
    //     },
    //     textfield: {
    //     //   padding: theme.spacing(2),
    //       textAlign: 'center',
    //       color: theme.palette.text.secondary,
    //     },
    //   }));

    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(3),
          backgroundColor: "#ff642f",
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(3),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));

    const classes = useStyles();

    const [result, setResult] = React.useState({});
    const information  = useSelector(state =>state.userReducer.information);
    const [ message, setMessage ] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const handleChangeDescription = (event) => {
        setMessage(event.target.value);
      };

      const handleSendAlert = () => {
        console.log(information['DID'])
        console.log(message)

        axios.post('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/create-alert/', {
            "did": information['DID'],
            "message": message
          })
          .then(function (result) {
            console.log(result);
            setSuccess(true);
            setError(false);
          })
          .catch(function (error) {
            console.log(error);
            setSuccess(false);
            setError(true);
          });
      };

        return (
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <NotificationImportantIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create alerts
              </Typography>
              <form className={classes.form} noValidate>
                <Grid
                container
                spacing={2}
                justify = "center"
                >
                  <Grid item align="center">
                    <TextField
                        id="outlined-multiline-static"
                        label="Description of the alert"
                        multiline
                        rows={6}
                        variant="outlined"
                        onChange={handleChangeDescription}
                    />
                  </Grid>
                  {success ? 
                <Grid item align="center">
                    <Alert severity="success"
                    align="center"
                    >
                        <AlertTitle>Success</AlertTitle>
                        <strong>Your alert has been sent</strong>
                    </Alert>
                </Grid>
            : null}
              {error ?
                <Grid item align="center">
                    <Alert severity="error"
                    align="center"
                    >
                        <AlertTitle>Error</AlertTitle>
                        <strong>Your alert didn't get sent</strong>
                    </Alert>
                </Grid>
            : null}
                </Grid>
                <Grid item align="center">
                    <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    align="center"
                    flexDirection='column'
                    onClick={handleSendAlert}
                    >
                    Send alerts
                    </Button>
                </Grid>
              </form>
          </div>
        );
    }
export default FireAlertSubmit;