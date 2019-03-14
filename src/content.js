/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer }from 'react-frame-component';

import "./content.css";

class Main extends React.Component {

    render() {
        return (	    
	        <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}> 
		<FrameContextConsumer>
               {
               // Callback is invoked with iframe's window and document instances
                   ({document, window}) => {
                      // Render Children
                        return (
                           <div className={'ir-main'}>
				<h1>Hello world - My first Extension</h1>

			    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare elit eu urna lacinia ultrices. In scelerisque dapibus ipsum a sollicitudin. Mauris scelerisque nibh quam, tristique fringilla arcu malesuada vitae. Duis in sollicitudin elit. Pellentesque risus ante, pretium id tortor sed, luctus condimentum dolor. Suspendisse varius sed felis ut vestibulum. Curabitur diam risus, pulvinar eu urna a, rhoncus pulvinar metus. Etiam laoreet vitae sem et iaculis. Nunc lectus enim, vestibulum pretium tempor sed, placerat eget dui.
			    
                           </div>
                        )
                    }
                }
                </FrameContextConsumer>
            </Frame>
        )
    }
    
}

const app = document.createElement('div');
app.id = "influencer-root";

//Add the app to the proper location in IG's display
//DEV
//var target_location = document.querySelectorAll('#react-root #section #main')[0];
//PROD
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
