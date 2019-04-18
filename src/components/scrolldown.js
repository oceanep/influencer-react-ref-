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
              this.props.complete ?
          	    <Row className="scrolldown-container">
                    <Col className="scroll-image-conatiner" span={6}>
                    	<div className="scrolldown-image"></div>
                    </Col>

                    <Col className="scroll-text" span={18}>
                      <span><b>Engagement rate and other data points are based off of images shown in browser. If you’d like to base analysis off of more images, please scroll down on Instagram.</b></span>
                    </Col>
          	    </Row>
              :
                <Row className="scrolldown-container-placeholder" ></Row>
    	)
    }
}

export default ScrollDown;
