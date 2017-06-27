import React from 'react';

const PageContent = (props) => {
  return (
   	<div className="main">
      {props.children}
    </div>
  );
};

export default PageContent;
