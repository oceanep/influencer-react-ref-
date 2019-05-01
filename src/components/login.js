/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import ScrollDown from "./scrolldown.js"
import "antd/dist/antd.css";
import "./login.css";
import {Form, Icon, Radio, Row, Col, Input, Button, Checkbox} from 'antd';

import { observer, inject } from "mobx-react";
import db from '../utils/storage';

const FormItem = Form.Item;

class Login extends React.Component{
    constructor(props){
    	super(props);
    	this.state = {
    	    first_name: '',
    	    last_name: '',
    	    business_email: '',
    	    user_type: null,
            registrationVisible: false,
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
        const user = {
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            business_email:this.state.business_email,
            user_type:this.state.user_type
        };
        db.table('users')
            .add(user)
            .then((id) => {
                this.props.login(id);
            })
  	event.preventDefault();
    }

    render(){

    	return(

          <React.Fragment>
            <div className='login-main'>

              <div>
                <Form className="login-form">
                  <div style={{ paddingLeft: '10pt', paddingBottom: '20pt'}}>
                    <span>ARE YOU A:</span>
                  </div>
                  <div className="wrapper">
                    <Row type="flex" justify="space-around" align="middle" gutter={12}>
                      <Col span={12}>
                        <label className="flex-item">
                          <input id="user_type" type="radio" value='brand' name="priority" onChange={this.handleInputChange}></input><span className='brand'></span>
                        </label>
                      </Col>
                      <Col span={12}>
                        <label className="flex-item">
                          <input id="user_type" type="radio" value='agency' name="priority" onChange={this.handleInputChange}></input> <span className='agency'></span>
                        </label>
                      </Col>
                    </Row>
                    <br/>
                    <Row type="flex" justify="space-around" align="middle" gutter={12}>
                      <Col span={12}>
                          <label className="flex-item">
                            <input id="user_type" type="radio" value='creator' name="priority" onChange={this.handleInputChange}></input> <span className='creator'></span>
                          </label>
                      </Col>
                      <Col span={12}>
                          <label className="flex-item">
                            <input id="user_type" type="radio" value='other' name="priority" onChange={this.handleInputChange}></input> <span className='other'></span>
                          </label>
                      </Col>
                    </Row>
                  </div>

      	         </Form>

                      <br/>
      	      </div>

                    {this.state.registrationVisible &&

                     <Form className="login-form" onSubmit={this.handleSubmit.bind(this)}>

                       <FormItem>

                         <Input id="first_name"
                                style={{ fontSize: 15, color: '#fff'}}
                                placeholder="First Name"
                                onChange={this.handleInputChange}
                          />
                        </FormItem>

                        <FormItem>

                          <Input id="last_name"
                                 style={{ fontSize: 15, color:'#fff'}}
                                 placeholder="Last Name"
                                 onChange={this.handleInputChange}
                          />
                        </FormItem>

                        <FormItem>

                          <Input id="business_email"
                                 style={{ fontSize: 15, color:'#fff'}}
                                 placeholder="Business Email"
                                 onChange={this.handleInputChange}
                          />

                        </FormItem>

                       <FormItem>

                         <Button
                           type="primary"
                           htmlType="submit"
                           className="login-form-button"
                         >
                           GET STARTED
                         </Button>
                       </FormItem>
                     </Form>
                    }
      	    </div>
            <ScrollDown complete={false}/>
          </React.Fragment>
    	)
    }

}

export default Login;
