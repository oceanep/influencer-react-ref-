/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import "./login.css";
import "antd/dist/antd.css";
import {Form, Icon, Radio} from 'antd';
import { observer, inject } from "mobx-react";


class Login extends React.Component{
    constructor(props){
	super(props);
	this.state = {
	    first_name: '',
	    last_name: '',
	    business_email: '',
	    user_type: null,
            registrationVisible: false
	}
	this.handleInputChange = this.handleInputChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleInputChange(event) {
	console.log(event.target.value);
	const target = event.target;
	const value = target.value;
	const name = target.id;
        if (name == "user_type"){
            //This is sloppy, and should be pulled into a separate method
	    this.setState({
	        [name]: value,
                registrationVisible: true
	    });
        }else{
            this.setState({
	        [name]: value
            });
        }
    }
    
    handleSubmit(event) {
	//alert('A name was submitted: ' + this.state.value);
	event.preventDefault();
    }

    render(){
                
	return(
	    <div>
	      <div>
		<form>
		  <Radio.Group>
		    <Radio.Button id="user_type" value="brand" onChange={this.handleInputChange}>Brand</Radio.Button>
		    <Radio.Button id="user_type" value="agency" onChange={this.handleInputChange}>Agency</Radio.Button>
                    <br/>
		    <Radio.Button id="user_type" value="influencer"onChange={this.handleInputChange}>Influencer</Radio.Button>
		    <Radio.Button id="user_type" value="other"onChange={this.handleInputChange}>Other</Radio.Button>
		  </Radio.Group>
		</form>
                <br/>
	      </div>

              {this.state.registrationVisible &&
               
	       <form onSubmit={this.handleSubmit}>
		 <label>
		   First Name:
		   <input id="first_name" type="text" value={this.state.first_name} onChange={this.handleInputChange} />
		 </label>
		 <br/>
		 <label>
		   Last Name:
		   <input id="last_name"  type="text" value={this.state.last_name} onChange={this.handleInputChange} />
		 </label>
		 <br/>
		 <label>
		   Business Email:
		   <input id="business_email" type="text" value={this.state.business_email} onChange={this.handleInputChange} />
		 </label>
		 <br/>
		 <input type="submit" value="Submit" />
	       </form>
              }
	    </div>
	)
    }

}

export default Login;
