/*global chrome*/
/* src/content.js */
import React from 'react';
import "./sideMenu.css";
import "antd/dist/antd.css";
import MediaCard from "./mediaCard.js";
import { Card, Row, Col, Layout, Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

const SideMenu = (props) => {

	return (
    // <Menu
    //   mode="vertical"
    //   style={{ color: 'rgb(255,255,255)', background: 'transparent'}}
    //   onClick={e => props.onClick(e)}
    // >
    //   <SubMenu
    //     key="sub1"
    //     title={<React.Fragment><span><Icon type={props.icon} /></span><span>{props.name}</span></React.Fragment>}
    //   >
    //     <Menu.Item key='0' className="menuItem"><span><Icon type="youtube" /><span>Media</span></span></Menu.Item>
    //     <Menu.Item key='1' className="menuItem">Mentions</Menu.Item>
    //     <Menu.Item key='2' className="menuItem">Hashtags</Menu.Item>
    //     <Menu.Item key='3' className="menuItem">Image Content</Menu.Item>
    //     <Menu.Item key='4' className="menuItem">Tagged Locations</Menu.Item>
    //     <Menu.Item key='5' className="menuItem">Brand Patterns</Menu.Item>
    //     <Menu.Item key='6' className="menuItem">Tagged Accounts</Menu.Item>
    //   </SubMenu>
    // </Menu>
		<div className="menu-container">
			<Menu
				mode="vertical"
				style={{ color: 'rgb(255,255,255)', background: 'transparent'}}
				onClick={e => props.onClick(e)}
			>
				<Menu.Item key='0' className="menuItem"><span><Icon type="youtube" /><span>Media</span></span></Menu.Item>
				<Menu.Item key='1' className="menuItem"><span><Icon type="youtube" /><span>Mentions</span></span></Menu.Item>
				<Menu.Item key='2' className="menuItem"><span><Icon type="youtube" /><span>Hashtags</span></span></Menu.Item>
				<Menu.Item key='3' className="menuItem"><span><Icon type="youtube" /><span>Image Content</span></span></Menu.Item>
				<Menu.Item key='4' className="menuItem"><span><Icon type="youtube" /><span>Tagged Locations</span></span></Menu.Item>
				<Menu.Item key='5' className="menuItem"><span><Icon type="youtube" /><span>Brand Patterns</span></span></Menu.Item>
				<Menu.Item key='6' className="menuItem"><span><Icon type="youtube" /><span>Tagged Accounts</span></span></Menu.Item>
			</Menu>
		</div>

	);
}

export default SideMenu;
