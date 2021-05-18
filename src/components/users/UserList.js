import React, { Component } from 'react';
import UserSummary from './UserSummary';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

class UserList extends Component {
  render() {
    const { users, auth } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="user container">
        <div className="row">
          <div className="user-list section">
            {users &&
              users.map((user) => {
                return (
                  <Link to={'/user/' + user.id} key={user.id}>
                    <UserSummary user={user} />
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="row">
          <NavLink to="/createUser">Create New User</NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    users: state.firestore.ordered.users,
    auth: state.firebase.auth,
  };
};

/* attempting to import the users subcollection in cafe.  Why users?
export default compose(
  connect(mapStateToProps),
  firestoreConnect((ownProps) => {
    const id = ownProps.match.params.id;
    return [
      {
        collection: 'users',
        doc: id,
        subcollections: 'users',
      },
    ];
  })
)(UserList);
*/

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'users' }])
)(UserList);
