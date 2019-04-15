/*global chrome*/
/* src/content.js */
import React from 'react';
import "./sideMenu.css";
import "antd/dist/antd.css";
import MediaCard from "./mediaCard.js";
import { Card, Row, Col, Layout, Menu, Icon} from 'antd';
import { FontAwesomeIcon as FAIcon} from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faAt,faHashtag,faImage,faHandshake } from '@fortawesome/free-solid-svg-icons'

const SubMenu = Menu.SubMenu;

const SideMenu = (props) => {

	return (
            
	    <div className="menu-container">
	      <Menu
		mode="vertical"
		style={{ color: 'rgb(255,255,255)', background: 'transparent'}}
		onClick={e => props.onClick(e)}
	      >
		<Menu.Item key='0' className="menuItem">
                  <span>
                    <FAIcon icon={faYoutube} /><span className="menuTitle">Media</span>
                  </span>
                </Menu.Item>

		<Menu.Item key='1' className="menuItem">
                  <span>
                    <FAIcon icon={faAt} /><span className="menuTitle">Mentions</span>
                  </span>
                </Menu.Item>
                
		<Menu.Item key='2' className="menuItem">
                  <span>
                    <FAIcon icon={faHashtag} /><span className="menuTitle">Hashtags</span>
                  </span>
                </Menu.Item>
                
		<Menu.Item key='3' className="menuItem">
                  <span>
                    <FAIcon icon={faImage} /><span className="menuTitle">Image Content</span>
                  </span>
                </Menu.Item>
                
		<Menu.Item key='4' className="menuItem">
                  <span>
                    <FAIcon className="fas fa-map-marker" /><span className="menuTitle">Tagged Locations</span>
                  </span>
                </Menu.Item>

		<Menu.Item key='5' className="menuItem">
                  <span>
                    <FAIcon icon="faHandshake" /><span className="menuTitle">Brand Partners</span>
                  </span>
                </Menu.Item>
                
		<Menu.Item key='6' className="menuItem">
                  <span>
                    <Icon type="youtube" /><span>Tagged Accounts</span>
                  </span>
                </Menu.Item>
                
	      </Menu>
	    </div>
            
	);
}

export default SideMenu;
