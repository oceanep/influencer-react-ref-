/*global chrome*/
/* src/content.js */
import React from 'react';
import "./sideMenu.css";
import "antd/dist/antd.css";
import MediaCard from "./mediaCard.js";
import { Card, Row, Col, Layout, Menu, Icon} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SubMenu = Menu.SubMenu;

const SideMenu = (props) => {

	return (
            
	    <div className="menu-container">
	      <Menu theme="dark"
		mode="vertical"
		style={{ color: 'rgb(255,255,255)', background: 'transparent'}}
		onClick={e => props.onClick(e)}
	      >
		<Menu.Item key='0' className="menuItem">
                  <span>
                    <FontAwesomeIcon icon={['fab', 'youtube']} fixedWidth/><span className="menuTitle">Media</span>
                  </span>
                </Menu.Item>

		<Menu.Item key='1' className="menuItem">
                  <span>
                    <FontAwesomeIcon icon={['fas','at']} fixedWidth/><span className="menuTitle">Mentions</span>
                  </span>
                </Menu.Item>
                
		<Menu.Item key='2' className="menuItem">
                  <span>
                    <FontAwesomeIcon icon={['fas', 'hashtag']} fixedWidth/><span className="menuTitle">Hashtags</span>
                  </span>
                </Menu.Item>
                
		<Menu.Item key='3' className="menuItem">
                  <span>
                    <FontAwesomeIcon icon={['fas', 'image']} fixedWidth/><span className="menuTitle">Image Content</span>
                  </span>
                </Menu.Item>
                
		<Menu.Item key='4' className="menuItem">
                  <span>
                    <FontAwesomeIcon icon={['fas', 'map-marker-alt']} fixedWidth/><span className="menuTitle">Tagged Locations</span>
                  </span>
                </Menu.Item>

		<Menu.Item key='5' className="menuItem">
                  <span>
                    <FontAwesomeIcon icon={['fas', 'handshake']} fixedWidth/><span className="menuTitle">Brand Partners</span>
                  </span>
                </Menu.Item>
                
		<Menu.Item key='6' className="menuItem">
                  <span>
                    <FontAwesomeIcon icon={['fas', 'user-circle']} fixedWidth/><span className="menuTitle">Tagged Accounts</span>
                  </span>
                </Menu.Item>
                
	      </Menu>
	    </div>
            
	);
}

export default SideMenu;
