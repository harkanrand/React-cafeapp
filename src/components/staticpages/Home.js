import React, { Component } from "react";
//import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';
//import { signUp } from '../../store/actions/authActions';
import { NavLink } from "react-router-dom";

class Home extends Component {
  componentWillMount() {
    document.getElementById("body").className = "homebody";
  }

  render() {
    //    const { auth, authError } = this.props;
    //    if (auth.uid) return <Redirect to="/" />;

    return (
      <div className="container">
        <div className="row section">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">
                A free inventory and shopping list app built for cafe owners by
                a cafe owner
              </span>
              <div className="row">
                <ul className="col s6 collection with-header">
                  <li className="collection-header">
                    <b>Inventory</b>
                  </li>
                  <li className="collection-item">
                    Better than an excellent spreadsheet
                  </li>
                  <li className="collection-item">
                    Conduct inventory from your phone
                  </li>
                  <li className="collection-item">
                    Get inventory status immediately
                  </li>
                  <li className="collection-item">
                    Adds directly to your shopping list
                  </li>
                </ul>

                <ul className="col s6 collection with-header">
                  <li className="collection-header">
                    <b>Shopping</b>
                  </li>
                  <li className="collection-item">
                    {" "}
                    Easily track prices for the items you buy
                  </li>
                  <li className="collection-item">
                    Maintain a running shopping list
                  </li>
                  <li className="collection-item">
                    Check off items as you shop so nothing is forgotten
                  </li>
                  <li className="collection-item">
                    Predict your budget before you go shopping
                  </li>
                </ul>
              </div>

              <NavLink to="/signup">
                <button className="waves-effect waves-light btn pink lighten-1 z-depth-0">
                  Sign Up
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
