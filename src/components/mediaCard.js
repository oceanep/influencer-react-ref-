/*global chrome*/
/* src/content.js */
import React from 'react';
import "./mediaCard.css";
import "antd/dist/antd.css";
import { Card, Row, Col, Layout, Menu, Icon } from 'antd';

const { Meta } = Card;
const SubMenu = Menu.SubMenu;

const MediaCard = (props) => {

  	return (
      <section>
        <Card className="mainBodyCard">
          <Menu mode="vertical" style={{ color: 'rgb(255,255,255)', background: 'transparent'}}>
            <SubMenu
              key="sub1"
              title={<span><Icon type="youtube" /><span>Media</span></span>}
            >
              <Menu.Item key='1' className="menuItem"><span><Icon type="youtube" /><span>Media</span></span></Menu.Item>
              <Menu.Item key='2' className="menuItem">Mentions</Menu.Item>
              <Menu.Item key='3' className="menuItem">Hashtags</Menu.Item>
              <Menu.Item key='4' className="menuItem">Image Content</Menu.Item>
              <Menu.Item key='5' className="menuItem">Tagged Locations</Menu.Item>
              <Menu.Item key='6' className="menuItem">Brand Patterns</Menu.Item>
              <Menu.Item key='7' className="menuItem">Tagged Accounts</Menu.Item>
            </SubMenu>
          </Menu>
          <Row type="flex" justify="space-between" gutter={16}>
            <Col span="12">
              <Card className="mediaCardBody" bordered={false}>
                <Meta
                  avatar={<Icon type="youtube" />}
                  title={<span className="cardTitle" >2 Videos</span>}
                  style={{ margin: 0}}
                />
                <Row gutter={16}>
                  <Col span={12}>
                    <span>3.49%</span>
                    <h5>ENG. RATE</h5>
                  </Col>
                  <Col span={6}>
                    <span>44.7K</span>
                    <h5>AVG VIEWS</h5>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <span>72.1K</span>
                    <h5>AVG LIKES</h5>
                  </Col>
                  <Col span={12}>
                    <span>1K</span>
                    <h5>AVG COM.</h5>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span="12">
              <Card className="mediaCardBody" bordered={false}>
                <Meta
                  avatar={<Icon type="picture" />}
                  title={<span className="cardTitle" >19 Images</span>}
                  style={{ margin: 0}}
                />
                <Row gutter={16}>
                  <Col span={12}>
                    <span>3.05%</span>
                    <h5>ENG. RATE</h5>
                  </Col>
                  <Col span={6}>
                    <span>63.2K</span>
                    <h5>AVG LIKES</h5>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <span>621</span>
                    <h5>AVG COMMENTS</h5>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Card>
      </section>
  	);

}

export default MediaCard;
