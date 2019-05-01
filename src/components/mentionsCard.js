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
        //console.log("Mentions: ", this.props.mentions);
        this.textMentions = this.props.profile.attributes['Mentions'];
    }

    
    handleClick(event){

        var old_div = document.getElementById("title-div");
        if (old_div != null){
            old_div.remove();
        }
        
        var a_tags = document.getElementsByClassName("v1Nh3");

        for (let tag of a_tags) {
            tag.style.display = "";
        }
        
        var _mentions = this.textMentions;
        var target_mention = null;
        var keyword = event.target.innerText;
        var target_div = document.getElementsByClassName("fx7hk")[0]
        var title_div =  document.createElement("div");
        title_div.id = "title-div";

        _mentions.forEach(mention =>{
            if (mention['Keyword'] == keyword){
                target_mention = mention;
            }
        })

        if(target_mention != null){
            var urls = target_mention['Posts'].map(sc => "https://www.instagram.com/p/" + sc + "/");
            target_div.insertAdjacentElement("afterend", title_div);
            var posts_length = target_mention['Posts'].length
            if (posts_length > 0){            
                title_div.innerHTML="<div class='title-container'><span class='title-bar'>" + posts_length + " posts mentioning " + keyword + ":" + "</span>";
            }
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
                                             <u className="mentions-item-name" onClick={this.handleClick.bind(this)}><a href={mention['Link']}>{mention['Keyword']}</a></u>
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
