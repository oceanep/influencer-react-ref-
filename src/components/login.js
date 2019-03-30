/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
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
	    <div class='login-main'>
	      <div>                                                                             
                <Form>

	            <Radio.Group>
                      
                      <Row gutter={16}>
                        <Col span={12}>
		          <Radio.Button id="user_type"
                                        style={{
                                            backgroundColor: 'rgb(116,76,246)',
                                            border: 'none',
                                            color: '#fff'
                                        }}
                                        value="brand" onChange={this.handleInputChange}>Brand</Radio.Button>
                        </Col>
                        <Col span={12}>
		          <Radio.Button id="user_type"
                                        style={{
                                            backgroundColor: 'rgb(200,58,67)',
                                            border: 'none',
                                            color: '#fff'
                                        }}
                                        value="agency" onChange={this.handleInputChange}>Agency</Radio.Button>                        
                        </Col>
                      </Row>
                      <br/>
                      <Row gutter={16}>
                        <Col span={12}>
		          <Radio.Button id="user_type"
                                        style={{
                                            backgroundColor: 'rgb(66,93,111)',
                                            border: 'none',
                                            color: '#fff'
                                        }}
                                        value="influencer"onChange={this.handleInputChange}>Influencer</Radio.Button>
                        </Col>
                        <Col span={12}>
		          <Radio.Button id="user_type"
                                        style={{
                                            backgroundColor: 'rgb(44,47,72)',                   
                                            color: '#fff'
                                        }}
                                        value="other"onChange={this.handleInputChange}>Other</Radio.Button>
                        </Col>
                      </Row>                
                      <br/>
                      
		    </Radio.Group>
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
                   >
                     GET STARTED
                   </Button>
                 </FormItem>
               </Form>
              }
	    </div>
	)
    }
    
}

export default Login;
