import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { render } from "@testing-library/react";

class ItemDetails extends React.Component {
  state = {
    edit: false,
    name: this.props.inventoryItem?.name,
    par: this.props.inventoryItem?.par,
    description: this.props.inventoryItem?.description,
    category: this.props.inventoryItem?.category,
  };

  render() {
    //const id = props.match.params.id;
    const { inventoryItem, auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    // console.log('props: ', props);

    if (inventoryItem) {
      console.log("inventoryItem: ", inventoryItem);
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content row">
              <div className="col s12 ">
                <button className="waves-effect waves-light btn pink lighten-1 z-depth-0">
                  Edit
                </button>
              </div>

              <span className="col s12 card-title">{inventoryItem.name}</span>
              <p className="col s12">par amount: {inventoryItem.par}</p>
            </div>

            <div className="card-action white ligthen-4 grey-text">
              <div>
                <p>
                  Description: <br />
                  {inventoryItem.description}
                </p>
              </div>
              <div>
                <p>
                  Category: <br />
                  {inventoryItem.category}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container center">
          <p>Loading item...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  // Todo: We should get just the specific item from firestore instead of all of the items and then filtering it out here
  const id = ownProps.match.params.id;
  const inventoryItems = state.firestore.data.inventoryItems;
  const inventoryItem = inventoryItems ? inventoryItems[id] : null;

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    inventoryItem: inventoryItem,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props, ownProps) => {
    console.log("defaultCafe: ", props.profile.defaultCafe);
    console.log("ownProps: ", ownProps.match.params.id);

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
)(ItemDetails);
