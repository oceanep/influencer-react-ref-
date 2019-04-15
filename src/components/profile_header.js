/*global chrome*/
/* src/profile_header.js */
import React from 'react';
import "./profile_header.css";
import "antd/dist/antd.css";
import {Row, Col, Avatar, Icon} from 'antd';
import { observer, inject } from "mobx-react";



class ProfileHeader extends React.Component{
    constructor(props) {
	     super(props);
    }

    render(){
    	return(
              this.props.complete ?
          	    <Row >
                    <Col className="profile-app-image" span={8}>
                      <div className="profile-image"></div>
                    </Col>

                    <Col className="profile-header" span={14}>
                      <span >
      		              <div className="skew">{this.props.profile.username}</div>
              	      </span>
                    </Col>

                    <Col className="profile-app-title" span={2}>
                      <div ><img src="images/influencer-logo1x.svg"/></div>
                    </Col>
          	    </Row>
              :
                <Row >
                  <Col className="profile-app-image" span={8}>
                    <div className="profile-login-image-holder"><img height="98%"src="images/double-arrows@1x.svg"/></div>
                    </Col>
                  <Col className="profile-header" span={14}>
                      <span >
                        <div className="login-skew">WELCOME</div>
                      </span>
                    </Col>

                  <Col className="profile-app-title" span={2}>
                    <div ><img src="images/influencer-logo2x.png"/></div>
                    </Col>
                </Row>
    	)
    }
}

export default ProfileHeader;
