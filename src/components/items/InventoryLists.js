import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, NavLink, Link } from "react-router-dom";
import moment from "moment";

class InventoryLists extends Component {
  state = {
    path: null,
  };

  render() {
    const { inventoryLists, auth, inventories } = this.props;
    const { path } = this.state;
    if (path) return <Redirect to={path} />;
    if (!auth.uid) return <Redirect to="/signin" />;

    console.log(inventories);
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

          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">Inventory lists</span>
              <table className="responsive-tabe highlight itemtable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryLists?.map((list) => {
                    return (
                      <tr key={list.id}>
                        <td>
                          <a
                            onClick={() =>
                              this.setState({
                                path: `/inventory/${list.id}/conduct`,
                              })
                            }
                            key={list.id}
                            className="waves-effect waves-light btn-small"
                          >
                            {list.name}
                          </a>
                        </td>
                        <td>{list.description}</td>
                        <td>({list.itemCount})</td>
                        <td>
                          <Link to={"/inventory/" + list.id} key={list.id}>
                            <i className="material-icons">edit</i>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">Inventory log</span>
              <table className="responsive-tabe highlight itemtable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {inventories?.map((inventory) => {
                    return (
                      <tr key={inventory.name}>
                        <td>{inventory.name}</td>
                        <td>
                          {" "}
                          {moment(inventory.dateCreated.toDate()).calendar()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
  //  console.log('state: ', state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    inventoryLists: state.firestore.ordered.inventoryLists,
    inventories: state.firestore.ordered.inventories,
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
      {
        collection: "cafes",
        doc: props.profile.defaultCafeId,
        subcollections: [{ collection: "inventories" }],
        storeAs: "inventories",
      },
    ];
  })
)(InventoryLists);
