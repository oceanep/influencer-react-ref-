/*global chrome*/
/* src/content.js */
import React from 'react';
import "./scrolldown.css";
import "antd/dist/antd.css";
import {Row, Col, Avatar} from 'antd';
import { observer, inject } from "mobx-react";



class ScrollDown extends React.Component{
    constructor(props) {
	     super(props);
    }

    render(){
    	return(
        	    <Row className="scrolldown-container">
                  <Col className="scroll-image-conatiner" span={6}>
                  	<div className="scrolldown-image"></div>
                  </Col>

                  <Col className="scroll-text" span={18}>
                    <span><b> SCROLL FOR MORE DATA</b></span>
                  </Col>
        	    </Row>
    	)
    }
}

export default ScrollDown;
