import React from 'react';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import * as Actions from '@shared/actions';
import { logout } from '@store/modules/auth/actions';
import PageHeader from '@shared/components/PageHeader';
import PageUnauthorizedHeader from '@shared/components/PageUnauthorizedHeader';

const MENU_ITEMS = [
  {
    name: 'book-now',
    label: 'Book now',
    activate: Actions.chooseActivity,
  },
  {
    name: 'calendar',
    label: 'Calendar',
    activate: Actions.home,
  },
  {
    name: 'refer',
    label: 'Refer',
    activate: Actions.home,
  }
];

const USER_MENU_ITEMS = [
  {
    name: 'profile-view',
    label: 'View Profile',
    activate: Actions.editProfile,
  },
  {
    name: 'account-settings',
    label: 'Account Settings',
    activate: Actions.accountSettings,
  },
  {
    name: 'subscriptions-settings',
    label: 'Subscription Settings',
    activate: Actions.subscriptionSettings,
  },
  {
    name: 'customer-support',
    label: 'Customer Support',
    activate: Actions.customerSupport,
  },
  {
    name: 'logout',
    label: 'Log Out',
    activate: Actions.userLogout,
  }
];

class PageHeaderContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserMenuOpen: false,
      isMessageOpen: false,
      isMobileMenuOpen: false,
    };

    this.menuClickWrapper = this.menuClickWrapper.bind(this);
    this.onUserMenuClick = this.onUserMenuClick.bind(this);
    this.onMessageClick = this.onMessageClick.bind(this);
    this.onMobileMenuClick = this.onMobileMenuClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.closeMenus = this.closeMenus.bind(this);
  }

  menuClickWrapper(item) {
    return (event) => {
      event.preventDefault();
      this.closeMenus();
      item.activate();
    };
  }

  onUserMenuClick(event) {
    event.preventDefault();

    this.setState({
      isUserMenuOpen: !this.state.isUserMenuOpen
    });
  }

  onMessageClick(event) {
    event.preventDefault();
    this.setState({
      isMessageOpen: !this.state.isMessageOpen
    });
  }

  onMobileMenuClick(event) {
    event.preventDefault();
    this.setState({
      isMobileMenuOpen: !this.state.isMobileMenuOpen
    });
  }

  closeMenus() {
    this.setState({
      isUserMenuOpen: false,
      isMessageOpen: false,
      isMobileMenuOpen: false,
    });
  }

  handleClickOutside(event) {
    this.closeMenus();
  }

  render() {
    const { isLoggedIn, user } = this.props;

    if (!isLoggedIn) {
      return (
        <PageUnauthorizedHeader />
      );
    }

    return (
      <PageHeader
        user={user}
        menuClickWrapper={this.menuClickWrapper}
        menuItems={MENU_ITEMS}
        userMenuItems={USER_MENU_ITEMS}
        isUserMenuOpen={this.state.isUserMenuOpen}
        onUserMenuClick={this.onUserMenuClick}
        isMessageOpen={this.state.isMessageOpen}
        onMessageClick={this.onMessageClick}
        isMobileMenuOpen={this.state.isMobileMenuOpen}
        onMobileMenuClick={this.onMobileMenuClick}
      />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.loggedIn,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(onClickOutside(PageHeaderContainer));
