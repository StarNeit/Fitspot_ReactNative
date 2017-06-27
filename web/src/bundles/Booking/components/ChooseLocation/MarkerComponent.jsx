import React, { Component, PropTypes } from 'react';

const MarkerComponent = (props) => {
  const {text, image} = props;
  const imgUrl = "https://d30y9cdsu7xlg0.cloudfront.net/png/191697-200.png";
  return (
    <div style={{
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover',
      overflow: 'hidden',
      position: 'relative', color: 'white', backgroundColor: '#5fb13d',
      border: '1px solid black',
      borderRadius: 20,
      textAlign: 'center',
      padding: 4,
      cursor: 'pointer',
      height: 40, width: 40, top: -20, left: -30,
    }}>

    </div>
  )
};

export default MarkerComponent;
