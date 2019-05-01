/*global chrome*/
/* src/content.js */
import React from 'react';
import "./hashtagsCard.css";
import "antd/dist/antd.css";
import { Card, Row, Col, Layout, Menu, Icon } from 'antd';

const { Meta } = Card;
const SubMenu = Menu.SubMenu;

class HashtagsCard extends React.Component {

    constructor(props){        
        super(props);
        console.log("Hashtags: ", this.props.hashtags);
        this.textHashtags = this.props.hashtags;
    }

    handleClick(event){
        let a_tags;
        var _hashtags = this.props.hashtags;
        var target_hashtag = null;
        var keyword = event.target.innerText;
        _hashtags.forEach(hashtag =>{
            if (hashtag['Keyword'] == keyword){
                target_hashtag = hashtag;
            }
        })

        if(target_hashtag != null){
            a_tags = document.getElementsByClassName("v1Nh3");
            var urls = target_hashtag['Posts'].map(sc => "https://www.instagram.com/p/" + sc + "/");

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
    mapHashtags(hashtags) {
        
        for (let hashtag of hashtags) {
            //change frequency to percent
            hashtag['percent'] = Math.floor(hashtag['Frequency'] * 10000)/100
            let barLength = Math.round(parseFloat(hashtag.percent));
            let barStyle = {
                width: barLength <= 10 ? `${barLength}0%` : '100%'
          };
            hashtag['barLength'] = barLength;
            hashtag['barStyle'] = barStyle;
        }
        
        const hashtagHTML = hashtags.map((hashtag) =>                                         
                                         <React.Fragment
                                           key={hashtag.name}
                                         >
                                           <Col
                                             span={10}
                                             className="hashtags-row"
                                           >
                                             <u className="hashtags-item-name" onClick={this.handleClick.bind(this)}><a href={hashtag['Link']}>{hashtag['Keyword']}</a></u>
                                           </Col>
                                           <Col
                                             span={14}
                                             className="hashtags-row"
                                           >
                                             <div className="hashtag-bar-container">
                                               <span
                                                 className="hashtag-bar"
                                                 style={hashtag.barStyle}
                                               >
                                                 {hashtag['Num']}
                                               </span>
                                             </div><span>{hashtag.percent}%</span>
                                           </Col>
                                         </React.Fragment>
                                        );        
        return hashtagHTML;
    }

    render(){
  	return (
            <Row type="flex" className="hashtags-container" justify="space-between" gutter={16}>
              {this.mapHashtags(this.textHashtags)}
            </Row>
  	);
    }
}

export default HashtagsCard;