import React from 'react';

import MessagesBtn from './MessagesBtn';
import UserProfileBtn from './UserProfileBtn';
import MobileMenu from './MobileMenu';
import MobileMessagesBtn from './MobileMessagesBtn';
import MobileUserProfileBtn from './MobileUserProfileBtn';
import * as Actions from '@shared/actions';


const PageHeader = (props) => {
  const { user, menuClickWrapper, menuItems, title } = props;

  const menu = menuItems.map((item) => {
    // TODO: Detect current page
    return (
      <a key={item.name} href="#" className="btn btn-link" onClick={menuClickWrapper(item)}>{item.label}</a>
    );
  });

  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-xs-6">
            <a href='#' onClick={Actions.home}>
              <img src={require('@assets/img/fitspot-white.svg')} alt="Fitspot" height="40"/>
            </a>

            <span className="logo-devider hidden-xs hidden-sm hidden-md"></span>
            <span className="secondry-logo-text hidden-xs hidden-sm hidden-md">{title || 'Fitspot'}</span>
          </div>

          <div className="col-xs-6 text-right hidden-xs hidden-sm hidden-md">
            {menu}
            <MessagesBtn
              user={user}
              isOpen={props.isMessageOpen}
              onClick={props.onMessageClick}
            />
            <UserProfileBtn
              user={user}
              menuClickWrapper={menuClickWrapper}
              menuItems={props.userMenuItems}
              isMenuOpen={props.isUserMenuOpen}
              onMenuClick={props.onUserMenuClick}
            />
          </div>

          <div className="col-xs-6 text-right visible-xs visible-sm visible-md">
            <MobileMessagesBtn
              user={user}
              isOpen={props.isMessageOpen}
              onClick={props.onMessageClick}
            />
            <MobileUserProfileBtn
              user={user}
              menuClickWrapper={menuClickWrapper}
              menuItems={props.userMenuItems}
              isMenuOpen={props.isUserMenuOpen}
              onMenuClick={props.onUserMenuClick}
            />
          </div>
        </div>

        <hr className="row-devider visible-xs visible-sm visible-md" />

        <div className="row visible-xs visible-sm visible-md">
          <div className="col-xs-6">
            <span className="secondry-logo-text">Book Now</span>
          </div>
          <div className="col-xs-6">
            <MobileMenu
              menuItems={menuItems}
              menuClickWrapper={menuClickWrapper}
              isMenuOpen={props.isMobileMenuOpen}
              onMenuClick={props.onMobileMenuClick}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
