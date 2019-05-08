/*global chrome*/
/* src/content.js */
import React from 'react';
import "./locationsCard.css";
import "antd/dist/antd.css";
import { Card, Row, Col, Layout, Menu, Icon } from 'antd';

const { Meta } = Card;
const SubMenu = Menu.SubMenu;

class LocationsCard extends React.Component {

    constructor(props){
        super(props);
        this.textLocations = this.props.locations;
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

        var _locations = this.textLocations;
        var target_location = null;
        var keyword = event.target.innerText;
        var target_div = document.getElementsByClassName("fx7hk")[0]
        var title_div =  document.createElement("div");
        title_div.id = "title-div";

        _locations.forEach(location =>{
            if (location['Keyword'] == keyword){
                target_location = location;
            }
        })

        if(target_location != null){
            var posts_length = target_location['Posts'].length;
            if (posts_length > 0){
                title_div.innerHTML="<div class='title-container'><span class='title-bar'>" + posts_length + " posts mentioning " + keyword + ":" + "</span>";
            }
            this.createDisplay([...target_location['Posts']]);
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


    mapLocations(locations) {

        for (let location of locations) {
            //change frequency to percent
            location['percent'] = Math.floor(location['Frequency'] * 10000)/100
            let barLength = Math.round(parseFloat(location.percent));
            let barStyle = {
                width: barLength <= 10 ? `${barLength}0%` : '100%'
          };
            location['barLength'] = barLength;
            location['barStyle'] = barStyle;
        }

        const locationHTML = locations.map((location) =>
                                         <React.Fragment
                                           key={location.name}
                                         >
                                           <Col
                                             span={10}
                                             className="locations-row"
                                           >
                                             <u className="locations-item-name" onClick={this.handleClick.bind(this)}><a href={location['Link']}>{location['Keyword']}</a></u>
                                           </Col>
                                           <Col
                                             span={14}
                                             className="locations-row"
                                           >
                                             <div className="location-bar-container">
                                               <span
                                                 className="location-bar"
                                                 style={location.barStyle}
                                               >
                                                 {location['Num']}
                                               </span>
                                             </div><span>{location.percent}%</span>
                                           </Col>
                                         </React.Fragment>
                                        );
        return locationHTML;
    }

    render(){
  	return (
            <Row type="flex" className="mentions-container" justify="space-between" gutter={16}>
              {this.mapLocations(this.textLocations)}
            </Row>
  	);
    }
}

export default LocationsCard;
