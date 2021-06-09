import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import { NavLink } from "react-router-dom";
//import moment from 'moment';
//import { InventorySummaryCard } from './InventorySummaryCard';

export const CafeDashboard = (props) => {
  const { profile, auth } = props;
  console.log("props: ", props);

  if (!auth.uid) return <Redirect to="/signin" />;

  if (profile) {
    if (profile.defaultCafeName) {
      return (
        <div className="container section bk-title-card">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{profile.defaultCafeName}</span>
            </div>
            <div className="card-action white ligthen-4 grey-text">
              <div>
                <p>
                  {profile.defaultCafeRole}: {profile.firstName}{" "}
                  {profile.lastName}
                </p>
              </div>
            </div>
          </div>

          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">Inventories to conduct</span>
            </div>
            <div className="card-action white ligthen-4 grey-text">
              <div>
                <p>Daily inventory task...</p>
                <p>Weekly inventory task...</p>
              </div>
            </div>
          </div>

          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">Current Shopping List</span>
            </div>
            <div className="card-action white ligthen-4 dark-grey-text">
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Urgency</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Whole Milk</td>
                      <td>8 gallons</td>
                      <td>high</td>
                    </tr>
                    <tr>
                      <td>Fresh Mozzerella</td>
                      <td>6</td>
                      <td>medium</td>
                    </tr>
                    <tr>
                      <td>Vanilly Syrup</td>
                      <td>4</td>
                      <td>low</td>
                    </tr>
                    <tr>
                      <td>Pellegrino - Blood Orage</td>
                      <td>1 case</td>
                      <td>low</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container section bk-title-card">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">No Cafe selected</span>
              <NavLink to="/createCafe">Create a Cafe</NavLink>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="container center">
        <p>Loading Profile...</p>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  //console.log(state);

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    users: state.firestore.ordered.users,
    inventoryItem: state.firestore.data.inventoryItems,
    //   inventoryItems: inventoryItems,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }]),
  firestoreConnect((props, ownProps) => {
    //    console.log('defaultCafe: ', props.profile.defaultCafe);
    //    console.log('ownProps: ', ownProps.match.params.id);

    if (!props.profile.defaultCafe) {
      return [];
    }

    return [
      {
        collection: "cafes",
        doc: props.profile.defaultCafe,
        subcollections: [
          { collection: "inventoryItems", doc: ownProps.match.params.id },
        ],
        storeAs: "inventoryItems",
      },
    ];
  })
)(CafeDashboard);
