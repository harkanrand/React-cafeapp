import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import CafeSummary from './CafeSummary';
//import * as firebase from 'firebase/app';

class CafeList extends Component {
  render() {
    const { cafes, auth } = this.props;
    console.log(this.props);
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="cafe container">
        <div className="row">
          <div className="cafe-list section">
            {cafes &&
              cafes.map((cafe) => {
                return (
                  <Link to={'/cafe/' + cafe.id} key={cafe.id}>
                    <CafeSummary cafe={cafe} />
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="row">
          <NavLink to="/createCafe">Create New Cafe</NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  //const user = state.firestore.collection('users').doc(state.firebase.auth.uid);
  /*
  const db = firebase.firestore();

  const uid = state.firebase.auth.uid;
  console.log('uid: ', uid);

  const users = state.firestore.users;
  //let user = users ? users[uid] : null;
  let user = db.collection('users').doc(uid);
  console.log('user: ', { user });

  const cafeid = user.defaultCafe;
  console.log('cafeid: ', cafeid);

  const cafes = state.firestore.data.cafe;
  console.log('cafes: ', cafes);

  const cafe = cafes ? cafes[cafeid] : null;
 // console.log('cafe: ', cafe);
 // console.log('state: ', state);
 */
  return {
    //cafes: state.firestore.ordered.cafes,
    auth: state.firebase.auth,
    cafes: state.firestore.ordered.cafes,
    users: state.firestore.ordered.users,
    // cafes: cafes,
    //  cafe: cafe,
    //  user: user,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'cafes' }]),
  firestoreConnect([{ collection: 'users' }])
)(CafeList);
