/*global chrome*/
/* src/content.js */
import React from 'react';
import "./imageContentCard.css";
import "antd/dist/antd.css";
import { Card, Row, Col, Layout, Menu, Icon } from 'antd';

const { Meta } = Card;
const SubMenu = Menu.SubMenu;

class ImageContentCard extends React.Component {

    constructor(props){        
        super(props);
        this.textImageContent = this.props.imagecontent;
    }

    handleClick(event){
        let a_tags;
        var _contents = this.props.imagecontent;
        var target_content = null;
        var keyword = event.target.innerText;
        _contents.forEach(content =>{
            if (content['Keyword'] == keyword){
                target_content = content;
            }
        })

        if(target_content != null){
            a_tags = document.getElementsByClassName("v1Nh3");
            var urls = target_content['Posts'].map(sc => "https://www.instagram.com/p/" + sc + "/");

            for (let tag of a_tags) {
                if (!urls.includes(tag.firstElementChild.href)){
                    tag.style.display = "none";
                }else{
                    tag.style.display = "";
                }
            }            
        }        
  	event.preventDefault();
    }

    
    //TODO-- hashtags, mentions, image content etc can reuses the same component -- no need for this
    mapImageContent(contents) {
        
        for (let content of contents) {
            //change frequency to percent
            content['percent'] = Math.floor(content['Frequency'] * 10000)/100
            let barLength = Math.round(parseFloat(content.percent));
            let barStyle = {
                width: barLength <= 10 ? `${barLength}0%` : '100%'
          };
            content['barLength'] = barLength;
            content['barStyle'] = barStyle;
        }
        
        const contentHTML = contents.map((content) =>                                         
                                         <React.Fragment
                                           key={content.name}
                                         >
                                           <Col
                                             span={10}
                                             className="contents-row"
                                           >
                                             <u className="contents-item-name" onClick={this.handleClick.bind(this)}>{content['Keyword']}</u>
                                           </Col>
                                           <Col
                                             span={14}
                                             className="contents-row"
                                           >
                                             <div className="content-bar-container">
                                               <span
                                                 className="content-bar"
                                                 style={content.barStyle}
                                               >
                                                 {content['Num']}
                                               </span>
                                             </div><span>{content.percent}%</span>
                                           </Col>
                                         </React.Fragment>
                                        );        
        return contentHTML;
    }

    render(){
  	return (
            <Row type="flex" className="contents-container" justify="space-between" gutter={16}>
              {this.mapImageContent(this.textImageContent)}
            </Row>
  	);
    }
}

export default ImageContentCard;
