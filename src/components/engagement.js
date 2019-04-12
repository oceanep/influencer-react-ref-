/*global chrome*/
/* src/content.js */
import React from 'react';
import "./engagement.css";
import "antd/dist/antd.css";
import MediaCard from "./mediaCard.js";
import MentionsCard from "./mentionsCard.js";
import ImageContent from "./imageContent.js";
import SideMenu from "./sideMenu.js";
import { Card, Row, Col, Layout, Menu, Icon } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const menuComponents = [
  {
    name:'Media',
    icon:'youtube',
    component: <MediaCard></MediaCard>
  },
  {
    name:'@ Mentions',
    icon:'',
    component: <MentionsCard></MentionsCard>
  },
  {
    name:'Hashtags',
    icon:'',
    component:''
  },
  {
    name:'Image Content',
    icon:'',
    component: <ImageContent></ImageContent>
  },
  {
    name:'Tagged Locations',
    icon:'',
    component:''
  },
  {
    name:'Brand Partners',
    icon:'',
    component:''
  },
  {
    name:'Tagged Accounts',
    icon:'',
    component:''
  }
];

class EngagementComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      current: 'overall',
      menuComponent: menuComponents[0]
    }
  }

  menuClick = (e) => {
    this.setState({
      current: e.key
    });
  }

  sideMenuClick = (e) => {
    console.log(`${e.key} outside menu`);
    this.setState({ menuComponent: menuComponents[e.key] });
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

        <section style={{ position: 'relative', height: '60%'}}>
          <SideMenu
            onClick={this.sideMenuClick}
            icon={this.state.menuComponent.icon}
            name={this.state.menuComponent.name}
          >
          </SideMenu>
          <section className="component-wrapper">
            <Card className="mainBodyCard">
              <div className="mainBodyTitle"><span><Icon type={this.state.menuComponent.icon} /><span>{this.state.menuComponent.name}</span></span></div>
                {this.state.menuComponent.component}
            </Card>
          </section>
        </section>
  	    </div>
  	)
  }
}

export default EngagementComponent;
