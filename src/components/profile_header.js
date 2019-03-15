/*global chrome*/
/* src/content.js */
import React from 'react';
import "./profile_header.css";
import "antd/dist/antd.css";
import { Layout, Row, Col,Avatar } from 'antd';

class ProfileHeader extends React.Component {

    render(){
	return (
	    <Row>
		<Col span={1}>
		<div class="profile-app-image">
		IMAGE
		</div>
	    </Col>
	    <div class="profile-header">
	    <span class="skew">
	    <Col class="profile-header" span={8}>NAME AREA</Col>
	    </span>
	    </div>
	    <div class="profile-app-title">
	    <Col span={1}>APP</Col>
	    </div>
	    </Row>
	)
    }


}

export default ProfileHeader;
