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
    }

    handleClick(event){
        window.scrollTo(0,0);
        var old_div = document.getElementById("title-div");
        if (old_div != null){
            old_div.remove();
        }

        var generated_divs = document.getElementsByClassName("ir-row");
        if (generated_divs.length > 0){
            for(let div of generated_divs){
                div.remove();
            }
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
            var posts_length = target_mention['Posts'].length
            if (posts_length > 0){
                title_div.innerHTML="<div class='title-container'><span class='title-bar'>" + posts_length + " posts mentioning " + keyword + ":" + "</span>";
            }
            this.createDisplay([...target_mention['Posts']]);
            target_div.insertAdjacentElement("afterend", title_div);
        }
  	event.preventDefault();
    }

    createDisplay(_posts){

        var a_tags = document.getElementsByClassName("v1Nh3");

        for (let tag of a_tags) {
            tag.style.display = "none";
        }

        console.log("Creating your display");
        var parent_div = document.getElementsByClassName("fx7hk")[0]
        //splitting array
        var grouped_array = [], size = 3;
        while (_posts.length > 0){
            grouped_array.push(_posts.splice(0, size));
        };
        console.log("groups: ", grouped_array);
        //get main IG area
        grouped_array.forEach(subarray => {
            var image_row = document.createElement("div");
            image_row.setAttribute("class", "Nnq7C weEfm ir-row");
            parent_div.insertAdjacentElement("afterend",image_row);
            //create row code
            subarray.forEach(item => {
                var image = document.createElement("div");
                image.setAttribute("class", "v1Nh3 kIKUG  _bz0w")
                image.innerHTML = `<a href="/p/${item['shortcode']}/"><div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" srcset=${item['display_url']} decoding="auto" sizes="293px" style="object-fit: cover;"></div><div class="_9AhH0"></div></div><div class="u7YqG"><span class="mediatypesSpriteCarousel__filled__32 u-__7" aria-label="???????????????"></span></div></a>`
                image_row.appendChild(image);
            });

            var ir_rows = document.getElementsByClassName("ir-row")
            var last_row = ir_rows[ir_rows.length-1];
            for (var i = 0; i < 6; i++) {
                var br = document.createElement("br")
                last_row.insertAdjacentElement("afterend", br);
            }

        });
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
