/*global chrome*/
/* src/content.js */
import React from 'react';
import "./profile_header.css";
import "antd/dist/antd.css";
import {Row, Col, Avatar} from 'antd';
import { observer, inject } from "mobx-react";



class ProfileHeader extends React.Component{
    constructor(props) {
	     super(props);
    }

    render(){
    	return(
        	    <Row >
                  <Col className="profile-app-image" span={8}>
                    <div className="profile-image"></div>
                  </Col>

                  <Col className="profile-header" span={14}>
                    <span >
    		              <div class="skew">{this.props.profile.username}</div>
            	      </span>
                  </Col>

                  <Col className="profile-app-title" span={2}>
            	       <div >INFLUENCER</div>
                  </Col>
        	    </Row>
    	)
    }
}

export default ProfileHeader;
