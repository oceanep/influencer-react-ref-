/*global chrome*/
/* src/content.js */
import React from 'react';
import "./engagement.css";
import "antd/dist/antd.css";
import MediaCard from "./mediaCard.js";
import { Card, Row, Col, Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class EngagementComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      current: 'overall'
    }
  }

  menuClick = (e) => {
    this.setState({
      current: e.key
    });
  }

  render(){
  	return (
  	    <div class="engagement-main">

  	    <Card className="mainBodyCard1">
    	    <Menu
            onClick={this.menuClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            style={{ backgroundColor: 'transparent', color: 'rgba(180, 180, 180, 1)'}}
          >
            <Menu.Item key="overall">
              OVERALL
            </Menu.Item>
            <span>LAST:</span>
            <Menu.Item key="7days">
              7 DAYS
            </Menu.Item>
            <Menu.Item key="30days">
              30 DAYS
            </Menu.Item>
            <Menu.Item key="90days">
              90 DAYS
            </Menu.Item>
          </Menu>
          <Row>
            <span style={{fontSize:'2em'}}>3.01%</span>
            <h5>ENGAGEMENT RATE</h5>
          </Row>
          <Row>
            <Col span={8}>
              <span>0.7</span>
              <h5>POST PER DAY</h5>
            </Col>
            <Col span={8}>
              <span>61.7K</span>
              <h5>AVG LIKES</h5>
            </Col>
            <Col span={8}>
              <span>635</span>
              <h5>AVG COMMENTS</h5>
            </Col>
          </Row>
  	    </Card>

  	    <MediaCard></MediaCard>
  	    </div>
  	)
  }
}

export default EngagementComponent;
