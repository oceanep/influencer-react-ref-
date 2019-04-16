/*global chrome*/
/* src/content.js */
import React from 'react';
import "./mentionsCard.css";
import "antd/dist/antd.css";
import { Card, Row, Col, Layout, Menu, Icon } from 'antd';

const { Meta } = Card;
const SubMenu = Menu.SubMenu;

const textMentions = [
  {
    name: '@doyoutravelpresets',
    amount: '4',
    percent: '8.15'
  },
  {
    name: '@lulus',
    amount: '3',
    percent: '4.12'
  },
  {
    name: '@visittheusa',
    amount: '2',
    percent: '2.78'
  }
];

const MentionsCard = (props) => {

  function mapMentions(mentions) {

    for (let mention of mentions) {
      let barLength = Math.round(parseFloat(mention.percent));
      let barStyle = {
        width: barLength <= 10 ? `${barLength}0%` : '100%'
      };
      mention['barLength'] = barLength;
      mention['barStyle'] = barStyle;
    }

    const mentionHTML = mentions.map((mention) =>

      <React.Fragment
        key={mention.name}
      >
        <Col
          span={10}
          className="mentions-row"
        >
          <u>{mention.name}</u>
        </Col>
        <Col
          span={14}
          className="mentions-row"
        >
          <div className="mention-bar-container">
            <span
              className="mention-bar"
              style={mention.barStyle}
            >
              {mention.amount}
            </span>
          </div><span>{mention.percent}%</span>
        </Col>
      </React.Fragment>
    );

    return mentionHTML;
  }

  	return (
          <Row type="flex" className="mentions-container" justify="space-between" gutter={16}>
            {mapMentions(textMentions)}
          </Row>
  	);

}

export default MentionsCard;
