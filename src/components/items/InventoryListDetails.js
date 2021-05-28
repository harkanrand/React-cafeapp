import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const InventoryListDetails = (props) => {
  //const id = props.match.params.id;
  const { inventoryList, inventoryItems, auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  // console.log('props: ', props);


  if (inventoryList) {
 //   if (inventoryItems) {
    return (
      <div>
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">Pick from this list</span>
            <table className="responsive-tabe highlight centered itemtable">
              <thead>
                <tr>
                  <th></th>
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
                          <Link to={'/item/' + item.id} key={item.id}>
                            add 1
                          </Link>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.par}</td>
                      </tr>
                    );
                  })}
                  </tbody>
                  </table>
            </div>
          </div>
        </div>


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
            {inventoryList.items &&
              inventoryList.items.map((item) => {
                return (
                  <tr>
                    <td>{item.quantity}</td>
                    <td>
                  <Link to={'/item/' + item.itemId} key={item.itemId}>
                    {item.name}
                  </Link>
                  </td>
                  <td>
                    {item.urgency}
                  </td>
                  </tr>
                );
              })}
              </tbody>
              </table>

            </div>
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
};

const mapStateToProps = (state, ownProps) => {
  //console.log(state);

  // Todo: We should get just the specific list directly from firestore instead of all of the inventory lists and then filtering it out here
  console.log('state: ', state);
  const id = ownProps.match.params.id;
  const inventoryLists = state.firestore.data.inventoryLists;
  const inventoryList = inventoryLists ? inventoryLists[id] : null;

  console.log('inventoryList: ', inventoryList);

  const inventoryItems = state.firestore.ordered.inventoryItems;
  console.log('inventoryItems: ', inventoryItems);

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    inventoryList: inventoryList,
    inventoryItems: inventoryItems,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props, ownProps) => {
    //    console.log('defaultCafe: ', props.profile.defaultCafe);
    //    console.log('ownProps: ', ownProps.match.params.id);

    if (!props.profile.defaultCafe) {
      return [];
    }

    return [
      {
        collection: 'cafes',
        doc: props.profile.defaultCafe,
        subcollections: [
          { collection: 'inventoryLists', doc: ownProps.match.params.id },
        ],
        storeAs: 'inventoryLists',
      },
      {
        collection: 'cafes',
        doc: props.profile.defaultCafeId,
        subcollections: [{ collection: 'inventoryItems' }],

      },
    ];
  })
)(InventoryListDetails);
