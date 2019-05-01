/*global chrome*/
/* src/content.js */
import React from 'react';
import "./locationsCard.css";
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
        let a_tags;
        var _partners = this.textPartners;
        var target_partner = null;
        var keyword = event.target.innerText;
        _partners.forEach(partner =>{
            if (partner['Keyword'] == keyword){
                target_partner = partner;
            }
        })

        if(target_partner != null){
            a_tags = document.getElementsByClassName("v1Nh3");
            var urls = target_partner['Posts'].map(sc => "https://www.instagram.com/p/" + sc + "/");

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
