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
        let a_tags;
        var _locations = this.textLocations;
        var target_location = null;
        var keyword = event.target.innerText;
        _locations.forEach(location =>{
            if (location['Keyword'] == keyword){
                target_location = location;
            }
        })

        if(target_location != null){
            a_tags = document.getElementsByClassName("v1Nh3");
            var urls = target_location['Posts'].map(sc => "https://www.instagram.com/p/" + sc + "/");

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
