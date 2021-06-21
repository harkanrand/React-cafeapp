import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class InventoryListDetails extends React.Component {
  render() {
    const { inventoryList, inventoryItems, auth, location } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;
    if (inventoryList) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{inventoryList.name}</span>
              <p>description: {inventoryList.description}</p>
            </div>

            <div className="card-action white ligthen-4 grey-text">
              <div>
                <table className="responsive-tabe highlight centered itemtable">
                  <thead>
                    <tr>
                      <th>Qty.</th>
                      <th>Item</th>
                      <th>Urgency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryList?.items?.map((itemId, i) => {
                      const item = inventoryItems?.find(
                        (item) => item.id === itemId
                      );
                      return item ? (
                        <tr key={i}>
                          <td>{item.par}</td>
                          <td>
                            <Link to={"/item/" + item.id} key={item.id}>
                              {item.name}
                            </Link>
                          </td>
                          <td>{item.urgency}</td>
                        </tr>
                      ) : (
                        <tr key={i} />
                      );
                    })}
                  </tbody>
                </table>
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
  //console.log(state);

  // Todo: We should get just the specific list directly from firestore instead of all of the inventory lists and then filtering it out here
  console.log("state: ", state);
  const id = ownProps.match.params.id;
  const inventoryLists = state.firestore.data.inventoryLists;
  const inventoryList = inventoryLists ? inventoryLists[id] : null;

  console.log("inventoryList: ", inventoryList);

  const inventoryItems = state.firestore.ordered.inventoryItems;
  console.log("inventoryItems: ", inventoryItems);

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    inventoryList: inventoryList,
    inventoryItems: inventoryItems,
    categories: state.item.categories,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props, ownProps) => {
    if (!props.profile.defaultCafeId) {
      return [];
    }

    return [
      {
        collection: "cafes",
        doc: props.profile.defaultCafeId,
        subcollections: [
          {
            collection: "inventoryList",
          },
        ],
        storeAs: "inventoryLists",
      },
      {
        collection: "cafes",
        doc: props.profile.defaultCafeId,
        subcollections: [{ collection: "inventoryItems" }],
        storeAs: "inventoryItems",
      },
    ];
  })
)(InventoryListDetails);
