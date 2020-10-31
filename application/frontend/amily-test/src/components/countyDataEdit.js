import React, { Component } from 'react';
import axios from 'axios';

class CountyDataEdit extends Component {

    constructor(props){
        super(props);

        this.state = {
            confirmed: '',
            death: '',
            recovered: '',
            countie: ''
        };
    };

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value });
    };

    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state)
        axios.post('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/update-covid/',this.state)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const { confirmed, death, recovered, countie } = this.state;
        return (
            <div>
                    <div>change/update data and stat WIP</div>
                    <form onSubmit = {this.submitHandler}>
                        
                        <label for = "confirmed">Confirmed : </label>
                        <input type ="number" name="confirmed" value={confirmed} onChange ={this.changeHandler}></input>
    
                        <label for = "death"> Deaths : </label>
                        <input type ="number" name="death" value={death} onChange ={this.changeHandler}></input>
    
                        <label for = "recovered">Recovered : </label>
                        <input type ="number" name="recovered" value={recovered} onChange ={this.changeHandler}></input>
                        
                        <label for = "countie">County :</label>
                        <input type ="text" name="countie" value={countie} onChange ={this.changeHandler}></input>
    
                        <div class="button-data-edit"></div>
                            <button type="submit">Submit</button>
                    </form>
            </div>
        );
    };
};

export default CountyDataEdit