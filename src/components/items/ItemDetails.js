import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { updateItem } from "../../store/actions/itemActions";
import EditableDetails from "../utils/EditableDetails";
import moment from "moment";
class ItemDetails extends React.Component {
  state = {
    edit: false,
    showCategories: false,
    items: {
      name: {
        value: this.props.inventoryItem?.name,
        label: "Name",
      },
      par: {
        value: this.props.inventoryItem?.par,
        label: "Par amount",
      },
      description: {
        value: this.props.inventoryItem?.description,
        label: "Description",
      },
    },
    category: this.props.inventoryItem?.category,
  };

  updateItem() {
    const { itemId } = this.props;

    let item = {};
    Object.entries(this.state.items).forEach(([key, { value }]) => {
      item = { ...item, [key]: value };
    });

    if (this.state.edit)
      this.props.updateItem(itemId, { ...item, category: this.state.category });
    this.setState((prev) => ({ edit: !prev.edit }));
  }

  changeValue(key, value) {
    const { items } = this.state;
    items[key].value = value;

    this.setState({ items });
  }

  render() {
    //const id = props.match.params.id;
    const { inventoryItem, auth, categories } = this.props;
    const { items } = this.state;
    if (!auth.uid) return <Redirect to="/signin" />;

    if (inventoryItem) {
      return (
        <EditableDetails
          items={items}
          changeValue={this.changeValue.bind(this)}
          action={this.updateItem.bind(this)}
          edit={this.state.edit}
          renderExtra={() => (
            <div>
              {this.state.edit ? (
                <div className="input-field row">
                  <input
                    className="col s8"
                    type="text"
                    id="category"
                    value={this.state.category}
                    disabled
                  />
                  <div className="col s3 offset-s1">
                    <a
                      className="dropdown-trigger btn"
                      onClick={() => this.setState({ showCategories: true })}
                    >
                      Select Category
                    </a>

                    <ul
                      style={this.state.showCategories ? styles.dropdown : {}}
                      className="dropdown-content"
                    >
                      {categories?.map(
                        (category, i) =>
                          category && (
                            <li key={i}>
                              <a
                                onClick={() =>
                                  this.setState({
                                    category,
                                    showCategories: false,
                                  })
                                }
                              >
                                {category}
                              </a>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <p>
                  Category: <br />
                  {this.state.category}
                </p>
              )}
              {moment(inventoryItem.dateCreated.toDate()).calendar()}
            </div>
          )}
        />
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
    itemId: id,
    categories: state.item.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateItem: (itemId, item) => dispatch(updateItem(itemId, item)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props, ownProps) => {
    console.log("defaultCafe: ", props.profile.defaultCafeId);
    console.log("ownProps: ", ownProps.match.params.id);

    if (!props.profile.defaultCafeId) {
      return [];
    }

    return [
      {
        collection: "cafes",
        doc: props.profile.defaultCafeId,
        subcollections: [
          { collection: "inventoryItems", doc: ownProps.match.params.id },
        ],
        storeAs: "inventoryItem",
      },
    ];
  })
)(ItemDetails);

const styles = {
  dropdown: {
    left: "inherit",
    top: "inherit",
    padding: 0,
    opacity: 1,
    display: "block",
  },
};
