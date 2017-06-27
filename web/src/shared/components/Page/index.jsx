import React from 'react';

const Page = (props) => {
  return (
    <div {...props}>{props.children}</div>
  );
};

export default Page;
