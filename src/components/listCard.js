/*global chrome*/
/* src/content.js */
import React from 'react';
import "./listCard.css";
import "antd/dist/antd.css";
import { Card, Row, Col, Layout, Menu, Icon } from 'antd';

const { Meta } = Card;
const SubMenu = Menu.SubMenu;

class ListCard extends React.Component {

    constructor(props){
        super(props);
        this.props.window.refreshState();
        //console.log("Mentions: ", this.props.mentions);
        //this.textItems = this.props.profile.attributes['Mentions'];
        this.textItems = this.props.items;
    }


    handleClick(event){
        //change the scroll height
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

        var _items = this.textItems;
        var target_item = null;
        var keyword = event.target.innerText;
        var target_div = document.getElementsByClassName("fx7hk")[0]
        var title_div =  document.createElement("div");
        title_div.id = "title-div";

        _items.forEach(item =>{
            if (item['Keyword'] == keyword){
                target_item = item;
            }
        })

        if(target_item != null){
            var posts_length = target_item['Posts'].length
            if (posts_length > 0){
                title_div.innerHTML="<div class='title-container'><span class='title-bar'>" + posts_length + " posts mentioning " + keyword + ":" + "</span>";
            }
            this.createDisplay([...target_item['Posts']]);
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

    mapItems(items) {

        for (let item of items) {
            //change frequency to percent
            item['percent'] = Math.floor(item['Frequency'] * 10000)/100
            let barLength = Math.round(parseFloat(item.percent));
            let barStyle = {
                width: barLength <= 10 ? `${barLength}0%` : '100%'
          };
            item['barLength'] = barLength;
            item['barStyle'] = barStyle;
        }

        const itemHTML = items.map((item) =>
                                         <React.Fragment
                                           key={item.name}
                                         >
                                           <Col
                                             span={10}
                                             className="items-row"
                                           >
                                             <u className="items-item-name" onClick={this.handleClick.bind(this)}><a href={item['Link']}>{item['Keyword']}</a></u>
                                           </Col>
                                           <Col
                                             span={14}
                                             className="items-row"
                                           >
                                             <div className="item-bar-container">
                                               <span
                                                 className="item-bar"
                                                 style={item.barStyle}
                                               >
                                                 {item['Num']}
                                               </span>
                                             </div><span>{item.percent}%</span>
                                           </Col>
                                         </React.Fragment>
                                        );
        return itemHTML;
    }

    render(){
  	return (
            <Row type="flex" className="items-container" justify="space-between" gutter={16}>
              {this.mapItems(this.textItems)}
            </Row>
  	);
    }
}

export default ListCard;
