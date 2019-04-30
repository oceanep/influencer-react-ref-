/*global chrome*/
/* src/content.js */
import React from 'react';
import "./mentionsCard.css";
import "antd/dist/antd.css";
import { Card, Row, Col, Layout, Menu, Icon } from 'antd';

const { Meta } = Card;
const SubMenu = Menu.SubMenu;

class MentionsCard extends React.Component {

    constructor(props){        
        super(props);
        console.log("Mentions: ", this.props.mentions);
        this.textMentions = this.props.mentions;
        // this.textMentions = [
        //     {
        //         name: '@doyoutravelpresets',
        //         amount: '4',
        //         percent: '8.15'
        //     },
        //     {
        //         name: '@lulus',
        //         amount: '3',
        //         percent: '4.12'
        //     },
        //     {
        //         name: '@visittheusa',
        //         amount: '2',
        //         percent: '2.78'
        //     }
        // ];
    }

    
    mapMentions(mentions) {
        
        for (let mention of mentions) {
            //change frequency to percent
            mention['percent'] = Math.floor(mention['Frequency'] * 10000)/100
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
                                             <u className="mentions-item-name"><a href={mention['Link']}>{mention['Keyword']}</a></u>
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
                                                 {mention['Num']}
                                               </span>
                                             </div><span>{mention.percent}%</span>
                                           </Col>
                                         </React.Fragment>
                                        );        
        return mentionHTML;
    }

    render(){
  	return (
            <Row type="flex" className="mentions-container" justify="space-between" gutter={16}>
              {this.mapMentions(this.textMentions)}
            </Row>
  	);
    }
}

export default MentionsCard;
