import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, NavLink, Link } from "react-router-dom";

class ItemList extends Component {
  render() {
    const { inventoryItems, auth } = this.props;
    //   console.log(this.props);
    if (!auth.uid) return <Redirect to="/signin" />;

    if (inventoryItems) {
      return (
        <div className="product container">
          <div className="row section">
            <NavLink to="/createItem">
              <button className="waves-effect waves-light btn pink lighten-1 z-depth-0">
                Add New Item
              </button>
            </NavLink>
          </div>

          <div className="row">
            <table className="responsive-tabe highlight centered itemtable">
              <thead>
                <tr>
                  <th>Item name</th>
                  <th>par quantity</th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems &&
                  inventoryItems.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <Link to={"/item/" + item.id} key={item.id}>
                            {item.name}
                          </Link>
                        </td>
                        <td>{item.par}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
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
  //  console.log('state: ', state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    inventoryItems: state.firestore.ordered.inventoryItems,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.profile.defaultCafeId) {
      return [];
    }
    console.log("defaultCafe: ", props.profile.defaultCafeId);

    return [
      {
        collection: "cafes",
        doc: props.profile.defaultCafeId,
        subcollections: [{ collection: "inventoryItems" }],
        storeAs: "inventoryItems",
      },
    ];
  })
)(ItemList);
