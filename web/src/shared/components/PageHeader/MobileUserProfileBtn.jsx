import React from 'react';


const MobileUserProfileBtn = (props) => {
  const { user, menuClickWrapper, menuItems, isMenuOpen, onMenuClick } = props;

  const menu = menuItems.map((item) => {
    // TODO: Detect current page
    const className = '';
    return (
      <li key={item.name} className={className}>
        <a href="#" onClick={menuClickWrapper(item)}>{item.label}</a>
      </li>
    );
  });

  const avatarUrl = user.avatar ? user.avatar.url : require('@assets/img/default_profile.png');

  let className = 'btn-group';
  if (isMenuOpen) {
    // TODO: Use cx()
    className += ' open';
  }

  return (
    <div className={className}>
  		<a href="#" className="btn btn-primary dropdown-toggle btn-user-profile" onClick={onMenuClick}>
        <span className="new-user-notification">2</span>
        <img className="user-avator" src={avatarUrl} alt="Fitspot" width="32" />
        <span className="caret"></span>
  		</a>
  		<ul className="dropdown-menu dropdown-menu-right profile-menu">
        {menu}
      </ul>
    </div>
  );
};

export default MobileUserProfileBtn;
