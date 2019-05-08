/*global chrome*/
/* src/content.js */
import React from 'react';
import "./partnersCard.css";
import "antd/dist/antd.css";
import { Card, Row, Col, Layout, Menu, Icon } from 'antd';

const { Meta } = Card;
const SubMenu = Menu.SubMenu;

class PartnersCard extends React.Component {

    constructor(props){
        super(props);
        this.textPartners = this.props.partners;
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


        var _partners = this.textPartners;
        var target_partner = null;
        var keyword = event.target.innerText;
        var target_div = document.getElementsByClassName("fx7hk")[0]
        var title_div =  document.createElement("div");
        title_div.id = "title-div";

        _partners.forEach(partner =>{
            if (partner['Keyword'] == keyword){
                target_partner = partner;
            }
        })

        if(target_partner != null){
            var posts_length = target_partner['Posts'].length
            if (posts_length > 0){
                title_div.innerHTML="<div class='title-container'><span class='title-bar'>" + posts_length + " posts with the Brand Parter " + keyword + ":" + "</span>";
            }
            this.createDisplay([...target_partner['Posts']]);
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

    mapPartners(partners) {

        for (let partner of partners) {
            //change frequency to percent
            partner['percent'] = Math.floor(partner['Frequency'] * 10000)/100
            let barLength = Math.round(parseFloat(partner.percent));
            let barStyle = {
                width: barLength <= 10 ? `${barLength}0%` : '100%'
          };
            partner['barLength'] = barLength;
            partner['barStyle'] = barStyle;
        }

        const partnerHTML = partners.map((partner) =>
                                         <React.Fragment
                                           key={partner.name}
                                         >
                                           <Col
                                             span={10}
                                             className="partners-row"
                                           >
                                             <u className="partners-item-name" onClick={this.handleClick.bind(this)}><a href={partner['Link']}>{partner['Keyword']}</a></u>
                                           </Col>
                                           <Col
                                             span={14}
                                             className="partners-row"
                                           >
                                             <div className="partner-bar-container">
                                               <span
                                                 className="partner-bar"
                                                 style={partner.barStyle}
                                               >
                                                 {partner['Num']}
                                               </span>
                                             </div><span>{partner.percent}%</span>
                                           </Col>
                                         </React.Fragment>
                                        );
        return partnerHTML;
    }

    render(){
  	return (
            <Row type="flex" className="mentions-container" justify="space-between" gutter={16}>
              {this.mapPartners(this.textPartners)}
            </Row>
  	);
    }
}

export default PartnersCard;
