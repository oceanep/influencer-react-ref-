/*global chrome*/
/* src/content.js */
import React from 'react';
import Paginate from './paginate.js';
import "./paginateHolder.css";
import "antd/dist/antd.css";
import FavoriteButton from './favoriteButton.js';
import {Row, Col, Avatar, Popconfirm, message, Button} from 'antd';

const schema = {
  allItems: [],
  currentItems: [],
  currentPage: 1,
  totalPages: 5,
  pageLimit: 9
}

function confirm(e) {
  console.log(e);
  //message.success('Click on Yes');
}

function cancel(e) {
  console.log(e);
  //message.error('Click on No');
}


class PaginateHolder extends React.Component{
  constructor(props){
    super(props);
      this.state = {
          favorites: props.favorites,
          allItems: [],
          currentItems: [],
          currentPage: null,
          totalPages: null
    }
    //replace schema with props.favoritesList or whatever you name it
    //this.setState({ ...this.props.favorites });
    console.log(this.props.favorites);
  }

    componentWillReceiveProps(nextProps) {
	this.setState({ profile: nextProps.profile,
                        favorites: nextProps.favorites});  
    }

    
  onPageChanged = data => {
    const { allItems, } = this.state;
    const { currentPage, totalPages, pageLimit } = { ...data };
    console.log(data);
    const offset = (currentPage - 1) * pageLimit;
    const currentItems = allItems.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentItems, totalPages });
  }

  render() {


    const { allItems, currentItems, currentPage, totalPages } = this.state;
    const totalItems = allItems.length;

    if (totalItems === 0) return null;

    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

    if(this.state.favorites.length > 0) {

      return (

        <div className="favorites-container">
          <div className="favorites-items">
            { currentItems.map(item =>
               <Row className="favorite-item-row">
                 <Col span={6}><a href="https://google.com"><Avatar shape="square" size={48} icon="user"/></a></Col>
                 <Col span={14}><div className="favorite-item-name"><a href="https://google.com">{item.name}</a></div></Col>
                 <Col span={2}>
                   <Popconfirm title={`Remove '${item}' from favorites?`} onConfirm={confirm} onCancel={cancel} okText="Yes" cancelText="No">
                     <a className="cancel-button" href="#">X</a>
                   </Popconfirm>
                 </Col>
               </Row>

             ) }

          </div>

          <Row className="favorites-nav">
            <Col span={18}>
              <Paginate totalRecords={totalItems} pageLimit={9} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </Col>
            <Col span={6}>
              { currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                </span>
              ) }
            </Col>
          </Row>

        </div>

      );

    }

  }

}

export default PaginateHolder;
