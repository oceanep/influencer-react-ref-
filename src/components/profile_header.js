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
        console.log("Props: ", this.props);
    	return(
              this.props.complete ?
          	<Row style={{height:'75px'}}>
                  <Col className="profile-app-image" span={8}>
                    <div className="profile-image" style={{backgroundImage: `url(${this.props.profile.profile_pic_url})`}}></div>
                    </Col>

                    <Col className="profile-header" span={14}>
                      <span >
      		              <div className="skew">{this.props.profile.username}</div>
              	      </span>
                    </Col>

                    <Col className="profile-app-title" span={2}>
                      {/* <div ><img width="70px" style={{paddingTop: '60%'}} src={chrome.runtime.getURL("images/influencer-logo1x.svg")}/></div> */}
                      <div ><img width="70px" style={{paddingTop: '60%'}} src={"images/influencer-logo1x.svg"}/></div> 
                    </Col>
          	    </Row>
              :
            <Row style={{height:'75px'}}>
                  <Col className="profile-app-image" span={8}>
                    {/* <div className="profile-login-image-holder"><img height="98%"src={chrome.runtime.getURL("images/double-arrows@1x.svg")}/></div> */}
                    <div className="profile-login-image-holder"><img height="98%"src={"images/double-arrows@1x.svg"}/></div>
                    </Col>
                  <Col className="profile-header" span={14}>
                      <span >
                        <div className="login-skew">WELCOME</div>
                      </span>
                    </Col>

                  <Col className="profile-app-title" span={2}>
                    {/* <div ><img width="70px" style={{paddingTop: '60%', paddingLeft: '0'}} src={chrome.runtime.getURL("images/influencer-logo1x.svg")}/></div> */}
                    <div ><img width="70px" style={{paddingTop: '30%'}} src={"images/influencer-logo1x.svg"}/></div>
                  </Col>
                </Row>
    	)
    }
}

export default ProfileHeader;
