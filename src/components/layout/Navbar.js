import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';

const Navbar = (props) => {
  const { auth, profile } = props;
  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );

  const tabs = auth.uid ? (
    <div className="nav-content">
      <ul className="tabs tabs-transparent grey darken-3">
        <li className="tab">
          <NavLink to="/cafe">Cafe</NavLink>
        </li>
        <li className="tab">
          <NavLink to="/inventoryLists">Inventory Lists</NavLink>
        </li>
        <li className="tab">
          <NavLink to="/itemList">Items</NavLink>
        </li>
        <li className="tab">
          <NavLink to="/products">Products</NavLink>
        </li>
        <li className="tab">
          <NavLink to="/suppliers">Suppliers</NavLink>
        </li>
      </ul>
    </div>
  ) : (
    <div />
  );

  return (
    <nav className="nav-extended grey darken-3 z-depth-0">
      <div className="nav-wrapper bk-nav">
        <Link to="/" className="brand-logo">
          CafeCohort
        </Link>
        {links}
      </div>
      {tabs}
    </nav>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Navbar);
