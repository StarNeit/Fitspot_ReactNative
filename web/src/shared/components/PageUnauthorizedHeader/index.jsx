import React from 'react';
import {userLogin, userRegister} from '@shared/actions';

const PageUnauthorizedHeader = (props) => {

  return (
    <header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-6">
            <img src={require('@assets/img/fitspot-white.svg')} alt="Fitspot" height="40" />
          </div>
          <div className="col-xs-6 text-right">
            <a className="btn btn-link" href="#" onClick={userLogin} role="button">LOG IN</a>
            <a className="btn btn-default" href="#" onClick={userRegister} role="button">REGISTER</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageUnauthorizedHeader;
