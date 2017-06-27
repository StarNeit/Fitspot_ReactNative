import React from 'react';

const MobileMenu = (props) => {
  const { menuItems, menuClickWrapper, isMenuOpen, onMenuClick } = props;

  const mobileMenu = menuItems.map((item) => {
    // TODO: Detect current page
    const className = '';
    return (
      <li key={item.name} className={className}>
        <a href="#" onClick={menuClickWrapper(item)}>{item.name}</a>
      </li>
    );
  });

  let menuClassName = 'nav navbar-collapse';
  if (isMenuOpen) {
    menuClassName += ' in';
  } else {
    // TODO: This is a hack
    menuClassName += ' hidden';
  }

  return (
    <nav className="navbar navbar-default">

      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" onClick={onMenuClick}>
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>

        <div className={menuClassName}>
          <ul className="nav navbar-nav">
            {mobileMenu}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MobileMenu;
