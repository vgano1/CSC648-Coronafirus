import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Alert from '@material-ui/lab/Alert';

function Required() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'* = Required'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(4),
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
      marginTop: theme.spacing(4),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const FireAddEntry = () => {
    const information = useSelector(state => state.userReducer.information);
    const [fireName,setFireName]=React.useState('');
    const [location,setLocation]=React.useState('');
    const [acresBurned,setAcresBurned]=React.useState('');
    const [containment, setContainment]=React.useState('');
    const [active,setActive]=React.useState('');
    const [dateCreated,setDateCreated]=React.useState('');
    const [coopAgen,setCoopAgen]=React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [failed, setFailed] = React.useState(false);

    const sendEntry = () => {
        const data = {
            'did': information['DID'],
            'incident_county' : information['countie'],
            'incident_name': fireName,
            'incident_location': location,
            'incident_acres_burned': acresBurned,
            'incident_containment': containment,
            'is_active': active,
            'incident_date_created': dateCreated,
            'incident_cooperating_agencies': coopAgen,
        };
        console.log(fireName,location,acresBurned,containment,active,dateCreated, coopAgen);
        axios.post('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/add-fire/', data)
        .then(res => {
            console.log(res);
            setSuccess(true);
            setFailed(false);
        })
        .catch(e => {
            console.log(e);
            setSuccess(false);
            setFailed(true);
        });
    };

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PostAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Fire Entry
          </Typography>
          <div>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="fire-name"
                  label="Fire Name"
                  name="fire-name"
                  autoComplete="fire-name"
                  value = {fireName}
                  onChange = {(g) => setFireName(g.target.value)}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  autoComplete="location"
                  value = {location}
                  onChange = {(g) => setLocation(g.target.value)}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="acres-burned"
                  label="Acres Burned"
                  name="acres-burned"
                  autoComplete="acres-burned"
                  value = {acresBurned}
                  onChange = {(g) => setAcresBurned(g.target.value)}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="containment"
                  label="Containment"
                  name="containment"
                  autoComplete="containment"
                  value = {containment}
                  onChange = {(g)=> setContainment(g.target.value)}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="cooperating-agencies"
                  label="Cooperating Agencies"
                  name="cooperating-agencies"
                  autoComplete="cooperating-agencies"
                  value = {coopAgen}
                  onChange = {(g)=>setCoopAgen(g.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="active"
                  label="Active"
                  name="active"
                  autoComplete="active"
                  value = {active}
                  onChange = {(g) => setActive(g.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                    id="date"
                    label="Date Created"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value = {dateCreated}
                    onChange = {(g)=> setDateCreated(g.target.value)}
                 />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {sendEntry} 
            >
              Submit
            </Button>
          </div>
        </div>
        <Box mt={5}>
          <Required />
        </Box>
      {success && (<Alert severity="success">New fire added !</Alert>)}
      {failed && (<Alert severity="error">Error try again !</Alert>)}
      </Container>
    );
};

export default FireAddEntry;