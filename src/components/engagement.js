/*global chrome*/
/* src/content.js */
import React from 'react';
import "./engagement.css";
import "antd/dist/antd.css";
import MediaCard from "./mediaCard.js";
import MentionsCard from "./mentionsCard.js";
import ImageContent from "./imageContent.js";
import SideMenu from "./sideMenu.js";
import PaginateHolder from "./paginateHolder.js";
import Paginate from "./paginate.js";
import ScrollDown from "./scrolldown.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Card, Row, Col, Layout, Menu, Icon } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const menuComponents = [
  {
    name:'Media',
    icon:['fab', 'youtube'],
    component: <MediaCard></MediaCard>
  },
  {
    name:'Mentions',
    icon:['fas', 'at'],
    component: <MentionsCard></MentionsCard>
  },
  {
    name:'Hashtags',
    icon:['fas', 'hashtag'],
    component:''
  },
  {
    name:'Image Content',
    icon:['fas', 'image'],
    component: <ImageContent></ImageContent>
  },
  {
    name:'Tagged Locations',
    icon:['fas', 'map-marker-alt'],
    component:''
  },
  {
    name:'Brand Partners',
    icon:['fas', 'handshake'],
    component:''
  },
  {
    name:'Tagged Accounts',
    icon:['fas', 'user-circle'],
    component:''
  },
  {
    name:'Favorites',
    icon:['fas', 'heart'],
    component: <PaginateHolder></PaginateHolder>
  }
];

class EngagementComponent extends React.Component {


    componentDidMount() {
        //Hack to force re-render so FontAwesome is loaded correctly
        setTimeout(() => this.forceUpdate(), 10)
    }
    
    componentWillReceiveProps() {
        //Hack to force re-render so FontAwesome is loaded correctlyq
        setTimeout(() => this.forceUpdate(), 10)
    }
    
    constructor(props){     
        super(props);
        this.state = {
            current: 'overall',
            menuComponent: menuComponents[0],
            user_id: null
        }
    }

  /*  componentDidMount(){
        var user_id = localStorage.getItem('IRUserId');
        if (user_id != null){
            this.forceUpdate();
        }
    } */
    
    menuClick = (e) => {
        this.setState({
            current: e.key
        });
    }

  sideMenuClick = (e) => {
    console.log(`${e.key} outside menu`);
    this.setState({ menuComponent: menuComponents[e.key] });
    this.state.menuComponent.name == 'Favorites' ? this.props.hideFooter() : this.props.showFooter();
  }

    render(){
  	return (
  	    <div style={{ height: '100%'}}>
          { this.state.menuComponent.name == 'Favorites' ?
            <React.Fragment>
              <div className="engagement-main">
                <section style={{ position: 'relative', height: '100%'}}>
                  <SideMenu
                    onClick={this.sideMenuClick}
                    icon={this.state.menuComponent.icon}
                    name={this.state.menuComponent.name}
                    fullLength
                  >
                  </SideMenu>
                  <section className="component-wrapper">
                    <Card className="mainBodyCard favorites">
                      <div className="mainBodyTitle"><span><FontAwesomeIcon icon={this.state.menuComponent.icon} fixedWidth/><span>{this.state.menuComponent.name}</span></span></div>
                        {this.state.menuComponent.component}
                    </Card>
                  </section>
                </section>
              </div>

              <ScrollDown complete={false}/>
            </React.Fragment>
            :
            <React.Fragment>
              <div className="engagement-main">
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
                      <div className="mainBodyTitle"><span><FontAwesomeIcon icon={this.state.menuComponent.icon} fixedWidth/><span style={{paddingLeft:"0.5em"}}>{this.state.menuComponent.name}</span></span></div>
                        {this.state.menuComponent.component}
                    </Card>
                  </section>
                </section>
              </div>

              <ScrollDown complete={true}/>
            </React.Fragment>
          }

  	    </div>
  	)
  }
}

export default EngagementComponent;
