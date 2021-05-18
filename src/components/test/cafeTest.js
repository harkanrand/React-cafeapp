import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class CafeTest extends Component {
  render() {
    const { cafes, auth } = this.props;

    console.log('props: ', this.props);

    if (!auth.uid) return <Redirect to="/signin" />;

    if (cafes) {
      return (
        <div className="dashboard container">
          <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
              {cafes &&
                cafes.map((cafe) => {
                  return <span className="card-title">{cafe.name}</span>;
                })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container center">
          <p>Loading cafes...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    cafes: state.firestore.ordered.cafes,
    inventoryItems: state.firestore.data.inventoryItems,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.profile.defaultCafe) {
      return [];
    }
    console.log('defaultCafe: ', props.profile.defaultCafe);

    return [
      {
        collection: 'cafes',
        doc: props.profile.defaultCafe,
      },
    ];
  }),
  firestoreConnect((props) => {
    if (!props.profile.defaultCafe) {
      return [];
    }
    console.log('defaultCafe: ', props.profile.defaultCafe);

    return [
      {
        collection: 'cafes',
        doc: props.profile.defaultCafe,
        subcollections: [{ collection: 'inventoryItems' }],
        storeAs: 'inventoryItems',
      },
    ];
  })
)(CafeTest);
