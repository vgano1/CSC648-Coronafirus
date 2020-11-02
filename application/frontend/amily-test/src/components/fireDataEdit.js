import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import userReducer from '../redux/reducers/userReducer'

const mapStateToProps = (state) => {
    return{
        information: state.information
    }
}

const mapDispatchToProps = () => {
    return {
        userReducer
    }
}

const data = {
    email: 'vito@mail.sfsu.edu',
    password: 'vitoTheBest:)',
  }
  axios.post('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/director-login/', data)
  .then(res => {
    this.setState({
        fire_name: '',
        did: res.data[0]['DID'],
        acres: '',
      });
  })
  .catch((e) => {
    console.log(e);
  });

class FireDataEdit extends Component{
    

    constructor(props){
        super(props);

        this.state = {
            fire_name: '',
            did: '',
            acres: ''
        };
    };

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state)
        axios.post('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/update-fire/',this.state)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const {fire_name, did, acres } = this.state;
        return(
            <div>
            <div>change/update data and stat WIP</div>
            <form onSubmit = {this.submitHandler}>
                
                <label for = "fire_name">Fire Name : </label>
                <input type ="text" name="fire_name" value={fire_name} onChange ={this.changeHandler}></input>

                <label for = "acres">Acres Burned : </label>
                <input type ="number" name="acres" value={acres} onChange ={this.changeHandler}></input>
                

                <div class="button-data-edit"></div>
                    <button type="submit">Submit</button>
            </form>
    </div>
        )
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(FireDataEdit)