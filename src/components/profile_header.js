/*global chrome*/
/* src/content.js */
import React from 'react';
import "./profile_header.css";
import "antd/dist/antd.css";
import {Row, Col, Avatar} from 'antd';
import { observer, inject } from "mobx-react";



const ProfileHeader = observer(props => (
    	<Row >
        		<Col className="profile-app-image" span={4}>
          		<div >
          		    <Avatar shape="square" size="large" icon="user" />
          		</div>
          	</Col>

            <Col className="profile-header" span={16}>
              <span class="skew">
        <div>{props.profile.username}</div>
        	    </span>
        	  </Col>

            <Col className="profile-app-title" span={4}>
        	     <div >INFLUENCER</div>
            </Col>
    	</Row>
));



export default ProfileHeader;
