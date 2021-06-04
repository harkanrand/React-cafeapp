import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { updateItem } from "../../store/actions/itemActions";

class ItemDetails extends React.Component {
  state = {
    edit: false,
    showCategories: false,
    name: this.props.inventoryItem?.name,
    par: this.props.inventoryItem?.par,
    description: this.props.inventoryItem?.description,
    category: this.props.inventoryItem?.category,
  };

  updateItem() {
    const { name, par, description, category, edit } = this.state;
    const { itemId } = this.props;

    if (edit)
      this.props.updateItem(itemId, { name, par, description, category });
    this.setState((prev) => ({ edit: !prev.edit }));
  }

  render() {
    //const id = props.match.params.id;
    const { inventoryItem, auth, categories } = this.props;
    const {
      edit,
      name,
      par,
      description,
      category,
      showCategories,
    } = this.state;
    if (!auth.uid) return <Redirect to="/signin" />;

    const items = [
      {
        key: "name",
        value: name,
        label: "Name",
      },
      {
        key: "par",
        value: par,
        label: "Par amount",
      },
      {
        key: "description",
        value: description,
        label: "Description",
      },
    ];

    if (inventoryItem) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <button
                onClick={() => this.updateItem()}
                className="waves-effect waves-light btn pink lighten-1 z-depth-0"
              >
                {edit ? "Save" : "Edit"}
              </button>
            </div>

            <div className="card-action white ligthen-4 grey-text">
              {items.map(({ key, value, label }, i) => (
                <div key={i}>
                  {edit ? (
                    <>
                      <label htmlFor={key}>{label}</label>
                      <input
                        id={key}
                        type="text"
                        value={value}
                        onChange={(e) =>
                          this.setState({ [key]: e.target.value })
                        }
                      />
                    </>
                  ) : (
                    <p>
                      {label}: <br />
                      {value}
                    </p>
                  )}
                </div>
              ))}
              <div>
                {edit ? (
                  <div className="input-field row">
                    <input
                      className="col s8"
                      type="text"
                      id="category"
                      value={category}
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
                        style={showCategories ? styles.dropdown : {}}
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
                    {category}
                  </p>
                )}
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
