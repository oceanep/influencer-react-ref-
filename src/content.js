/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import "./content.css";
import "antd/dist/antd.css";
import ProfileHeader from "./components/profile_header.js";
import EngagementComponent from "./components/engagement.js";
import { Layout } from 'antd';
const { Header, Content, Footer} = Layout;

var profileRegex =  /^\/([\w.\-_]+)\/$/

class Main extends React.Component {

    
    
    componentDidMount(){
	
	if (profileRegex.test(document.location.pathname)) {
	    //set props has profile to true
	    //begin to get data from dom
            return;
	}
	else{
	    //set props has profile to null
            return;
	}

    }

    
    render() {
        return (
            <div
              className={'influencer-main'}
              style={{ float: 'right'}}
              >
        	    <Layout>
        	    <Header style={{ backgroundColor: 'rgb(38,40,70)'}}>
        	      <ProfileHeader />
        	    </Header>
        	    <Content>
        	      <EngagementComponent />
        	    </Content>
        	    </Layout>
        	    <Footer>Scroll Down Component</Footer>
            </div>
        )
    }
}


//COMMENTING OUT CHROME SPECIFIC SECTION
const app = document.createElement('div');
app.id = "influencer-root";

var target_location = document.querySelectorAll('#react-root section main')[0];
target_location.classList.add('with-sidebar');
target_location.appendChild(app);
ReactDOM.render(<Main />, app);


//app.style.display = "none";

chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
       if(request.message === "clicked_browser_action") {
        toggle();
      }
   }
);


function toggle(){
   if(app.style.display === "none"){
       app.style.display = "block";
       target_location.classList.add('with-sidebar');
   }else{
       app.style.display = "none";
       target_location.classList.remove('with-sidebar');
   }
}

export default Main;
