import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import counties from './../counties';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Alert, AlertTitle } from '@material-ui/lab';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import { Redirect } from "react-router-dom";
import { Link as LLink } from "react-router-dom";

const axios = require('axios');

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [countie, setCountie] = React.useState('San Francisco');
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);

  const handleChangeCountie = (event) => {
    setCountie(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  let handleEmailVerification = () => {

    // don't remember from where i copied this code, but this works.
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ( re.test(email) ) {
        setSuccess(true)
        setError(false)
        axios.post('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/create-user/', {
          "mail": email,
          "countie": countie
        })
        .then(function (response) {
          setRedirect(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      setSuccess(false)
      setError(true)
    }
}

  return (
    <div>
    {redirect === false ? (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <NotificationImportantIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Receive alerts
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
                <InputLabel id="countie-select-label">Countie</InputLabel>
                <Select
                labelId="countie-select-label"
                id="countie-simple-select"
                value={countie}
                onChange={handleChangeCountie}
                >
                {counties.map((item, i) => { return <MenuItem key={i} value={item}>{item} </MenuItem> })}
                </Select>
            </Grid>
            {success ? 
                <Grid item xs={12}>
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        <strong>You will now receive alerts</strong>
                    </Alert>
                </Grid>
            : null}
              {error ? 
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  Bad email input — <strong>Please put a correct email!</strong>
                </Alert>
            : null}
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleEmailVerification()}
          >
            Receive alerts
          </Button>
        </form>
        <LLink to="/login">Are you an Administrator or Director?</LLink>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    ) : <Redirect to="/" />}
    </div>
  );
}