/*global chrome*/
/* src/content.js */
import React from 'react';
import "./engagement.css";
import "antd/dist/antd.css";
import { Card } from 'antd';

class EngagementComponent extends React.Component {
 
    render(){       
	return (	    
	    <div class="engagement-main">

	    <Card style={{ width: 500, color: 'white', backgroundColor: '#2D2F4A' }}>
	    <p>Engagement Data</p>
	    <p>Engagement Data</p>
	    <p>Engagement Data</p>
	    </Card>

	    <Card style={{ width: 500, color:'white', backgroundColor: '#2D2F4A' }}>
	    <p>Media Data</p>
	    <p>Media Data</p>
	    </Card>	    
	    </div>
	)

    }
}

export default EngagementComponent;
