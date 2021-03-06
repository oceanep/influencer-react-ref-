/*global chrome*/
/* src/content.js */
import React from 'react';
import "./engagement.css";
import "antd/dist/antd.css";
import MediaCard from "./mediaCard.js";
import MentionsCard from "./mentionsCard.js";
import LocationsCard from "./locationsCard.js";
import ImageContentCard from "./imageContentCard.js";
import HashtagsCard from "./hashtagsCard.js";
import ImageContent from "./imageContent.js";
import PartnersCard from "./partnersCard.js";
import TaggedAccountsCard from "./taggedAccountsCard.js";
import SideMenu from "./sideMenu.js";
import PaginateHolder from "./paginateHolder.js";
import Paginate from "./paginate.js";
import ScrollDown from "./scrolldown.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Card, Row, Col, Layout, Menu, Icon } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class EngagementComponent extends React.Component {

    componentWillReceiveProps(nextProps) {
	this.setState({ profile: nextProps.profile,
                        favorites: nextProps.favorites});
    }

    constructor(props){
        super(props);
        this.state = {
            profile: props.profile,
            favorites: props.favorites
        };
    }

    componentWillMount(){
        this.props.window.refreshState();
        this.menuComponents = [
            {
                name:'Media',
                icon:['fab', 'youtube'],
                component: <MediaCard profile={this.props.profile}></MediaCard>
            },
            {
                name:'Mentions',
                icon:['fas', 'at'],
                component: <MentionsCard mentions={this.props.profile.attributes['Mentions']}></MentionsCard>
            },
            {
                name:'Hashtags',
                icon:['fas', 'hashtag'],
                component:<HashtagsCard hashtags={this.props.profile.attributes['Hashtags']}></HashtagsCard>
            },
            {
                name:'Image Content',
                icon:['fas', 'image'],
                component:<ImageContentCard imagecontent={this.props.profile.attributes['Image Content']}></ImageContentCard>
            },
            {
                name:'Tagged Locations',
                icon:['fas', 'map-marker-alt'],
                component:<LocationsCard locations={this.props.profile.attributes['Tagged Locations']}></LocationsCard>
            },
            {
                name:'Brand Partners',
                icon:['fas', 'handshake'],
                component:<PartnersCard partners={this.props.profile.attributes['Brand Partners']}></PartnersCard>
            },
            {
                name:'Tagged Accounts',
                icon:['fas', 'user-circle'],
                component:<TaggedAccountsCard taggedaccounts={this.props.profile.attributes['Tagged Accounts']}></TaggedAccountsCard>
            },
            {
                name:'Favorites',
                icon:['fas', 'heart'],
                component: <PaginateHolder favoritesCallback={this.props.favoritesCallback} favorites={this.state.favorites}></PaginateHolder>
            }
        ];

        this.state = {
            current: 'overall',
            menuComponent: this.menuComponents[0],
            user_id: null
        }
    }

    menuClick = (e) => {
        this.setState({
            current: e.key
        });
    }

    sideMenuClick = (e) => {
        console.log(`${e.key} outside menu`);
        this.setState({ menuComponent: this.menuComponents[e.key] });
        this.state.menuComponent.name == 'Favorites' ? this.props.hideFooter() : this.props.showFooter();
    }

    render(){
        console.log("Profile in engagement: ", this.state.profile);
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
                      ALL
                    </Menu.Item>
                    <Menu.Item key="7days">
                      7 DAY
                    </Menu.Item>
                    <Menu.Item key="30days">
                      30 DAY
                    </Menu.Item>
                    <Menu.Item key="90days">
                      90 DAY
                    </Menu.Item>
                  </Menu>

                  <Row>
                    <span style={{fontSize:'2em'}}>{Math.floor(this.props.profile.attributes.engagementRate * 10000)/100}%</span>
                    <h5>ENGAGEMENT RATE</h5>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <span>{this.props.profile.attributes.postsPerDay.toFixed(2)}</span>
                      <h5>POST PER DAY</h5>
                    </Col>
                    <Col span={8}>
                      <span>{Math.round(this.props.profile.attributes.avgLikes)}</span>
                      <h5>AVG LIKES</h5>
                    </Col>
                    <Col span={8}>
                      <span>{Math.round(this.props.profile.attributes.avgCommentsPerImage)}</span>
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
