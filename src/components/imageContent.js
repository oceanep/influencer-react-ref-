/*global chrome*/
/* src/content.js */
import React from 'react';
import "./imageContent.css";
import "antd/dist/antd.css";
import { Row, Col, Icon, Avatar } from 'antd';

const images = [
  {
    img_src: ''
  },
  {
    img_src: ''
  },
  {
    img_src: ''
  },
  {
    img_src: ''
  },
  {
    img_src: ''
  },
  {
    img_src: ''
  },
  {
    img_src: ''
  },
  {
    img_src: ''
  },
  {
    img_src: ''
  }
];

const ImageContent = (props) => {

  function mapImages(images) {

    // for (let image of images) {
    //
    // }

    const imageGrid = images.map((image) =>

      <Col span={8} >
        <div className="image_container">
          <Avatar shape="square" size={96} icon="picture" />
        </div>
      </Col>

    );

    return imageGrid;
  }

  	return (
          <Row type="flex" justify="space-around" align="middle" gutter={12}>
            {mapImages(images)}
          </Row>
  	);

}

export default ImageContent;
