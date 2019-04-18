/*global chrome*/
/* src/content.js */
import React from 'react';
import Paginate from './paginate.js';
import "./paginateHolder.css";
import "antd/dist/antd.css";
import {Row, Col, Avatar, Popconfirm, message, Button} from 'antd';

const schema = {
  allItems: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8', 'user9', 'user10', 'user11',
     'user12', 'user13', 'user14', 'user15', 'user16', 'user17', 'user18', 'user19', 'user20', 'user21', 'user22', 'user23',
      'user24', 'user25', 'user26', 'user27', 'user28', 'user29', 'user30', 'user31', 'user32', 'user33', 'user34', 'user35',
       'user36', 'user37', 'user38', 'user39', 'user40', 'user41', 'user42', 'user43', 'user44', 'user45', 'user46', 'user47',
       'user48', 'user49', 'user50', 'user51', 'user52', 'user53', 'user54'
  ],
  currentItems: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8', 'user9'],
  currentPage: 1,
  totalPages: 5,
  pageLimit: 9
}

function confirm(e) {
  console.log(e);
  message.success('Click on Yes');
}

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}


class PaginateHolder extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      allItems: [],
      currentItems: [],
      currentPage: null,
      totalPages: null
    }
  }

  componentWillMount() {
    this.setState({ ...schema });
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

    return (
      <div className="favorites-container">
        <div className="favorites-items">
          { currentItems.map(item =>
             <Row className="favorite-item-row">
               <Col span={6}><a href="https://google.com"><Avatar shape="square" size={48} icon="user"/></a></Col>
               <Col span={14}><div className="favorite-item-name"><a href="https://google.com">{item}</a></div></Col>
               <Col span={2}>
                 <Popconfirm title={`Remove ${item} from favorites?`} onConfirm={confirm} onCancel={cancel} okText="Yes" cancelText="No">
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

export default PaginateHolder;
