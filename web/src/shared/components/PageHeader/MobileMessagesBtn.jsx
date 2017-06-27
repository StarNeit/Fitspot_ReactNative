import React from 'react';


const MobileMessagesBtn = (props) => {
  const { user, isOpen, onClick } = props;

  let className = 'btn-group';
  if (isOpen) {
    className += ' open';
  }

  return (
    <div className={className}>
      <a href="#" className="btn btn-primary dropdown-toggle" onClick={onClick}>
        <span className="new-message-notification">2</span>
        <i className="fa fa-2x fa-comments" aria-hidden="true"></i> 
        <span className="caret"></span>
      </a>
      <ul className="dropdown-menu dropdown-menu-right messages-menu">
        <li className="active"><a href="#">View Profile</a></li>
        <li><a href="#">Account Settings</a></li>
        <li><a href="#">Customer Support</a></li>
        <li><a href="#">Log Out</a></li>
      </ul>
    </div>
  );
};

export default MobileMessagesBtn;
