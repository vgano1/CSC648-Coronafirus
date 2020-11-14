import React from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { setInformation, setIsLoggedIn, setUserType } from '../redux/actions/userActions';
import { useCookies } from "react-cookie";


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),

  },
}));


export default function SignIn() {
  const classes = useStyles();
  //const [information, setInformation] = React.useState({})
  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');
  //const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const information = useSelector(state => state.userReducer.information);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['userInformations']);

  React.useEffect(() => {
    if (cookies['userInformations']) {
      setEmail(cookies['userInformations']['mail']);
      setPassword(cookies['userInformations']['pwd']);
    }
  }, []);

  const updatePassword = (g) => {
    setPassword(g.target.value);
  };
  const updateEmail = (g) => {
    setEmail(g.target.value);
  }
//helo
  const redirect = (props) => {
    console.log(props)

    setCookie("userInformations", JSON.stringify(props), {
      path: "/"
    });
    //set userType : Covid , Fire , Admin
    if (props["DID"] > 0) {
      if(props.department ==='Health'){
        dispatch(setUserType('Covid'));
      }
      else if(props.department === 'Fire'){
        dispatch(setUserType('Fire'));
      }
      // set information object and login status
      dispatch(setInformation(props));
      dispatch(setIsLoggedIn(true));
    }
    else if (props["AID"] > 0) {
      dispatch(setUserType('Admin'));
      // set information object and login status
      dispatch(setInformation(props));
      dispatch(setIsLoggedIn(true));
    }
  };

  const authenticate = () => {
    const data = {
      email: email,
      password: password,
    }
    axios.post('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/director-login/', data)
    .then(res => {
      //console.log(res.data);
      redirect(res.data[0]);
    })
    .catch((e) => {
      removeCookie('userInfomations');
      console.log(e);
    });
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = {updateEmail}
              value = {email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {updatePassword}
              value = {password}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {authenticate}
            >
              Sign In
            </Button>
          </div>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    </div>
  );
}