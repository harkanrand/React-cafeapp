import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import M from "materialize-css";
import AddItemDialog from "./AddItemDialog";

class ShoppingList extends Component {
  componentDidMount() {
    this.container.addEventListener("DOMContentLoaded", this.handler());
  }

  componentWillUnmount() {
    this.container.removeEventListener("DOMContentLoaded", this.handler());
  }

  handler = () => {
    const elems = this.container.querySelectorAll(".modal");
    M.Modal.init(elems, {});
  };

  render() {
    const { auth, list } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div ref={(ref) => (this.container = ref)} className="container">
        <div className="card">
          <div className="card-content">
            <span className="card-title">Current shopping list</span>
            <div className="row">
              <div className="col s3 offset-s9">
                <button
                  data-target="modal1"
                  className="waves-effect waves-light btn pink lighten-1 z-depth-0 modal-trigger"
                >
                  Add new item
                </button>
                <AddItemDialog list={list} />
              </div>

              <div>
                <table className="responsive-tabe highlight itemtable">
                  <thead>
                    <tr>
                      <th>Itemname</th>
                      <th>Qty.</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {list?.list?.map((item, i) => (
                      <tr key={i}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.status}</td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    list: state.firestore.data.list,
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
        subcollections: [{ collection: "shoppingLists", doc: "main" }],
        storeAs: "list",
      },
    ];
  })
)(ShoppingList);
