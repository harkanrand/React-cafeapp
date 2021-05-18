import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

export const UserDetails = (props) => {
  const { user, auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;

  if (user) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">
              {user.fName} {user.lName}
            </span>
          </div>

          <div className="card-action white ligthen-4 grey-text">
            <div>
              <p>Date joined: {moment(user.dateCreated.toDate()).calendar()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading user...</p>
      </div>
    );
  }
};

// Todo: 1) We are pullilng all users to find the logged in user's profile
//       2) The unique user ID is not in the URL, this is likely a security issue (low)
const mapStateToProps = (state, ownProps) => {
  //console.log(state);
  const id = ownProps.match.params.id;
  const users = state.firestore.data.users;
  const user = users ? users[id] : null;
  return {
    user: user,
    auth: state.firebase.auth,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'users' }])
)(UserDetails);
