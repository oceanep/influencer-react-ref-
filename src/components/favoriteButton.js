import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'antd';

class FavoriteButton extends React.Component {
  constructor(props){
    super(props);
  }

    componentDidMount() {
        //Hack to force re-render so FontAwesome is loaded correctly
        setTimeout(() => this.forceUpdate(), 10)
    }

    componentWillReceiveProps() {
        //Hack to force re-render so FontAwesome is loaded correctlyq
        setTimeout(() => this.forceUpdate(), 10)
    }


    addToFavoritesClick(){
        console.log("clicked");
        //grab data here and pass to url and name
        this.props.callback('url', 'name');
    }

    render() {

        return (
            <div style={{paddingLeft:"5%"}}>
              <Button
                style={{backgroundColor: "rgb(120,200,199)",
                        fontWeight: "bold",
                        border: "none",
                        outline:"none",
                        height: "22pt"
                       }}
                type="primary"
                className="add-to-favorites-button"
                onClick={this.addToFavoritesClick.bind(this)}>
                Add to Favorites
              </Button>
            </div>
        )
    }
}

export default FavoriteButton
