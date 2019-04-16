/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import ScrollDown from "./scrolldown.js"
import "antd/dist/antd.css";
import "./login.css";
import {Form, Icon, Radio, Row, Col, Input, Button, Checkbox} from 'antd';

import { observer, inject } from "mobx-react";

const FormItem = Form.Item;

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

          <React.Fragment>
            <div className='login-main'>

              <div>
                <Form className="login-form">
                  <div style={{ paddingLeft: '10pt', paddingBottom: '20pt'}}>
                    <span>ARE YOU A:</span>
                  </div>
                  <div className="wrapper">
                    <Row type="flex" justify="space-around" align="middle" gutter={12}>
                      <Col span={8}>
                        <label className="flex-item">
                          <input id="user_type" type="radio" value="critical" name="priority" value='brand' onChange={this.handleInputChange}></input><span className='brand'></span>
                        </label>
                      </Col>
                      <Col span={8}>
                        <label className="flex-item">
                          <input id="user_type" type="radio" value="high" name="priority" value='agency' onChange={this.handleInputChange}></input> <span className='agency'></span>
                        </label>
                      </Col>
                    </Row>
                    <Row type="flex" justify="space-around" align="middle" gutter={12}>
                      <Col span={8}>
                          <label className="flex-item">
                            <input id="user_type" type="radio" value="medium" name="priority" value='creator' onChange={this.handleInputChange}></input> <span className='creator'></span>
                          </label>
                      </Col>
                      <Col span={8}>
                          <label className="flex-item">
                            <input id="user_type" type="radio" value="low" name="priority" value='other' onChange={this.handleInputChange}></input> <span className='other'></span>
                          </label>
                      </Col>
                    </Row>
                  </div>

      	         </Form>

                      <br/>
      	      </div>

                    {this.state.registrationVisible &&

                     <Form onSubmit={this.handleSubmit} className="login-form">


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
                           onClick={this.props.login}
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
