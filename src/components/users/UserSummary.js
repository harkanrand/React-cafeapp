import React from 'react';
import moment from 'moment';
const UserSummary = ({ user }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">
          {user.fName} {user.lName}
        </span>
        <p>Date joined: {moment(user.dateCreated.toDate()).calendar()}</p>
      </div>
    </div>
  );
};

export default UserSummary;
