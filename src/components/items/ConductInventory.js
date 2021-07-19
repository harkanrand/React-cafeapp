import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { conductInventory } from "../../store/actions/itemActions";

class InventoryListDetails extends React.Component {
  state = {
    fetched: false,
  };

  componentDidUpdate() {
    const { inventoryList } = this.props;
    if (
      (!this.state.fetched && inventoryList) ||
      this.state.inventoryList?.items?.length !== inventoryList?.items?.length
    ) {
      this.setState({
        fetched: true,
        inventoryList,
      });
    }
  }

  changeStatus(key, status) {
    const inventoryList = JSON.parse(JSON.stringify(this.state.inventoryList));
    inventoryList.items[key].status = status;
    this.setState({ inventoryList });
  }

  changeStock(key, stock) {
    const inventoryList = JSON.parse(JSON.stringify(this.state.inventoryList));
    const { par } = inventoryList.items[key];

    inventoryList.items[key].stock = stock;

    inventoryList.items[key].status =
      parseInt(stock) >= parseInt(par)
        ? "ok"
        : parseInt(stock) === 0
        ? "out"
        : "low";

    this.setState({ inventoryList });
  }

  disableSubmit() {
    return !this.state.inventoryList.items.every((item) => item.status);
  }

  submit() {}

  render() {
    const { auth } = this.props;
    const { inventoryList } = this.state;

    if (!auth.uid) return <Redirect to="/signin" />;
    if (inventoryList) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{`Conduct inventory for: ${inventoryList.name}`}</span>
              <div className="row">
                <p className="col s9">
                  Description: {inventoryList.description}
                </p>
                <button
                  disabled={this.disableSubmit()}
                  onClick={() => this.submit()}
                  className="col s2 offset-s1 waves-effect waves-light btn pink lighten-1 z-depth-0"
                >
                  Submit
                </button>
              </div>
            </div>

            <div className="card-action white ligthen-4 grey-text">
              <div>
                <table className="responsive-tabe highlight itemtable">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Par</th>
                      <th>Stock</th>
                      <th>In Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryList?.items?.map((item, i) => (
                      <tr key={i}>
                        <td>
                          <Link
                            style={{ marginLeft: 5 }}
                            to={"/item/" + item.id}
                            key={item.id}
                          >
                            {item.name +
                              (item.unit ? " (" + item.unit + ")" : "")}
                          </Link>
                        </td>
                        <td>{item.par}</td>
                        <td>
                          <input
                            disabled={item.inStock}
                            onChange={(e) =>
                              this.changeStock(i, e.target.value)
                            }
                            placeholder="Stock"
                            type="number"
                            value={item.stock || ""}
                          />
                        </td>
                        <td>
                          {["ok", "low", "out"].map((key) => (
                            <p key={key}>
                              <label>
                                <input
                                  checked={item.status === key}
                                  onChange={(e) => this.changeStatus(i, key)}
                                  name={item.name + i}
                                  type="radio"
                                  value={item.status || false}
                                />
                                <span style={{ textTransform: "capitalize" }}>
                                  {key}
                                </span>
                              </label>
                            </p>
                          ))}
                        </td>
                      </tr>
                    ))}
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
  const id = ownProps.match.params.id;
  const inventoryLists = state.firestore.data.inventoryLists;
  const inventoryList = inventoryLists ? inventoryLists[id] : null;

  const inventoryItems = state.firestore.ordered.inventoryItems;

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    inventoryList: inventoryList,
    inventoryItems: inventoryItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    conductInventory: (inventory) => dispatch(conductInventory(inventory)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
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
