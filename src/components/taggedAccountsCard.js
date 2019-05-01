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
        let a_tags;
        var _taggedaccounts = this.textTaggedAccounts;
        var target_taggedaccount = null;
        var keyword = event.target.innerText;
        _taggedaccounts.forEach(taggedaccount =>{
            if (taggedaccount['Keyword'] == keyword){
                target_taggedaccount = taggedaccount;
            }
        })

        if(target_taggedaccount != null){
            a_tags = document.getElementsByClassName("v1Nh3");
            var urls = target_taggedaccount['Posts'].map(sc => "https://www.instagram.com/p/" + sc + "/");

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
