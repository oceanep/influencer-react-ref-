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
        window.scrollTo(0,0);
        var old_div = document.getElementById("title-div");
        if (old_div != null){
            old_div.remove();
        }

        //var a_tags = document.getElementsByClassName("v1Nh3");
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

        var _hashtags = this.props.hashtags;
        var target_hashtag = null;
        var keyword = event.target.innerText;
        var target_div = document.getElementsByClassName("fx7hk")[0]
        var title_div =  document.createElement("div");
        title_div.id = "title-div";

        _hashtags.forEach(hashtag =>{
            if (hashtag['Keyword'] == keyword){
                target_hashtag = hashtag;
            }
        })

        if(target_hashtag != null){
            var posts_length = target_hashtag['Posts'].length
            if (posts_length > 0){
                title_div.innerHTML="<div class='title-container'><span class='title-bar'>" + posts_length + " posts with hashtag " + keyword + ":" + "</span>";
            }
            this.createDisplay([...target_hashtag['Posts']]);
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
                console.log("Item being built: ", item);
                var image = document.createElement("div");
                image.setAttribute("class", "v1Nh3 kIKUG  _bz0w")
                image.innerHTML = `<a href="/p/${item['shortcode']}/"><div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" srcset=${item['display_url']} decoding="auto" sizes="293px" style="object-fit: cover;"></div><div class="_9AhH0"></div></div><div class="u7YqG"><span class="mediatypesSpriteCarousel__filled__32 u-__7" aria-label="カルーセル"></span></div></a>`
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


    //TODO-- hashtags, mentions, image content etc can reuse the same component -- no need for this
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
