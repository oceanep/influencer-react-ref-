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

        var _contents = this.props.imagecontent;
        var target_content = null;
        var keyword = event.target.innerText;
        var target_div = document.getElementsByClassName("fx7hk")[0]
        var title_div =  document.createElement("div");
        title_div.id = "title-div";

        _contents.forEach(content =>{
            if (content['Keyword'] == keyword){
                target_content = content;
            }
        })

        if(target_content != null){
            var posts_length = target_content['Posts'].length
            if (posts_length > 0){
                title_div.innerHTML="<div class='title-container'><span class='title-bar'>" + posts_length + " posts with image content " + keyword + ":" + "</span>";
            }
            this.createDisplay([...target_content['Posts']]);
            target_div.insertAdjacentElement("afterend", title_div);
        }
  	event.preventDefault();
    }

    createDisplay(_posts){
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
        });
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
