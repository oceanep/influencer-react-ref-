/*global chrome*/
/* src/content.js */
import React from 'react';
import "./taggedAccountsCard.css";
import "antd/dist/antd.css";
import { Card, Row, Col, Layout, Menu, Icon } from 'antd';

const { Meta } = Card;
const SubMenu = Menu.SubMenu;

class PartnersCard extends React.Component {

    constructor(props){
        super(props);
        this.textTaggedAccounts = this.props.taggedaccounts;
    }


    handleClick(event){

        //change the scroll height
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

        var _taggedaccounts = this.textTaggedAccounts;
        var target_taggedaccount = null;
        var keyword = event.target.innerText;
        var target_div = document.getElementsByClassName("fx7hk")[0]
        var title_div =  document.createElement("div");
        _taggedaccounts.forEach(taggedaccount =>{
            if (taggedaccount['Keyword'] == keyword){
                target_taggedaccount = taggedaccount;
            }
        })

        if(target_taggedaccount != null){
            var posts_length = target_taggedaccount['Posts'].length
            if (posts_length > 0){
                title_div.innerHTML="<div class='title-container'><span class='title-bar'>" + posts_length + " posts tagging " + keyword + ":" + "</span>";
            }
            this.createDisplay([...target_taggedaccount['Posts']]);
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

    mapTaggedAccounts(taggedaccounts) {

        for (let taggedaccount of taggedaccounts) {
            //change frequency to percent
            taggedaccount['percent'] = Math.floor(taggedaccount['Frequency'] * 10000)/100
            let barLength = Math.round(parseFloat(taggedaccount.percent));
            let barStyle = {
                width: barLength <= 10 ? `${barLength}0%` : '100%'
          };
            taggedaccount['barLength'] = barLength;
            taggedaccount['barStyle'] = barStyle;
        }

        const taggedaccountHTML = taggedaccounts.map((taggedaccount) =>
                                         <React.Fragment
                                           key={taggedaccount.name}
                                         >
                                           <Col
                                             span={10}
                                             className="taggedaccounts-row"
                                           >
                                             <u className="taggedaccounts-item-name" onClick={this.handleClick.bind(this)}><a href={taggedaccount['Link']}>{taggedaccount['Keyword']}</a></u>
                                           </Col>
                                           <Col
                                             span={14}
                                             className="taggedaccounts-row"
                                           >
                                             <div className="taggedaccount-bar-container">
                                               <span
                                                 className="taggedaccount-bar"
                                                 style={taggedaccount.barStyle}
                                               >
                                                 {taggedaccount['Num']}
                                               </span>
                                             </div><span>{taggedaccount.percent}%</span>
                                           </Col>
                                         </React.Fragment>
                                        );
        return taggedaccountHTML;
    }

    render(){
  	return (
            <Row type="flex" className="mentions-container" justify="space-between" gutter={16}>
              {this.mapTaggedAccounts(this.textTaggedAccounts)}
            </Row>
  	);
    }
}

export default PartnersCard;
