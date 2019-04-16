/*global chrome*/
/* src/content.js */
import React from 'react';
import Paginate from './paginate.js';
import "./paginateHolder.css";
import "antd/dist/antd.css";
import {Row, Col, Avatar} from 'antd';

const schema = {
  allItems: ['state1', 'state2', 'state3', 'state4', 'state5', 'state6', 'state7', 'state8', 'state9', 'state10', 'state11',
     'state12', 'state13', 'state14', 'state15', 'state16', 'state17', 'state18', 'state19', 'state20', 'state21', 'state22', 'state23',
      'state24', 'state25', 'state26', 'state27', 'state28', 'state29', 'state30', 'state31', 'state32', 'state33', 'state34', 'state35',
       'state36', 'state37', 'state38', 'state39', 'state40', 'state41', 'state42', 'state43', 'state44', 'state45', 'state46', 'state47',
       'state48', 'state49', 'state50', 'state51', 'state52', 'state53', 'state54'
  ],
  currentItems: ['state1', 'state2', 'state3', 'state4', 'state5', 'state6', 'state7', 'state8', 'state9'],
  currentPage: 1,
  totalPages: 5,
  pageLimit: 9
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
               <Col span={6}><Avatar shape="square" size={48} icon="picture"/></Col>
               <Col span={14}><div className="favorite-item-name">{item}</div></Col>
               <Col span={2}><div className="cancel-button">X</div></Col>
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
