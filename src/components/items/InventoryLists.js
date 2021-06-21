import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, NavLink, Link } from "react-router-dom";

class InventoryLists extends Component {
  render() {
    const { inventoryLists, auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    if (inventoryLists) {
      return (
        <div className="product container">
          <div className="row section">
            <NavLink to="/createItem">
              <button className="waves-effect waves-light btn pink lighten-1 z-depth-0">
                Add New Item
              </button>
            </NavLink>
            {"  "}
            <NavLink to="/createItemList">
              <button className="waves-effect waves-light btn pink lighten-1 z-depth-0">
                Create Inventory List
              </button>
            </NavLink>
          </div>

          <div className="row">
            <table className="responsive-tabe highlight centered itemtable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {inventoryLists &&
                  inventoryLists.map((list) => {
                    return (
                      <tr key={list.id}>
                        <td>
                          <Link
                            to={`/inventory/${list.id}/conduct`}
                            key={list.id}
                          >
                            {`Conduct ${list.name}`}
                          </Link>
                        </td>
                        <td>{list.description}</td>
                        <td>({list.itemCount})</td>
                        <td>
                          <Link to={"/inventory/" + list.id} key={list.id}>
                            {`Edit ${list.name}`}
                          </Link>
                        </td>
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
    inventoryLists: state.firestore.ordered.inventoryLists,
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
        subcollections: [{ collection: "inventoryList" }],
        storeAs: "inventoryLists",
      },
    ];
  })
)(InventoryLists);
