import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';
//import { signUp } from '../../store/actions/authActions';
import {NavLink } from 'react-router-dom';


class Home extends Component {
 
  componentWillMount(){
    document.getElementById('body').className='homebody';
  }


  render() {
//    const { auth, authError } = this.props;
//    if (auth.uid) return <Redirect to="/" />;

    return (
      <div>
        <h1>A free inventory and shopping list app</h1>
        <h2>designed by a cafe owner for cafe owners</h2>

        <NavLink to="/signup">
          <button className="waves-effect waves-light btn pink lighten-1 z-depth-0">
            Sign Up
          </button>
        </NavLink>


      </div>
    );
  }
}

export default Home;
