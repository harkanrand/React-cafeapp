import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { addToShoppingList } from "../../store/actions/shoppingActions";

class AddItemDialog extends React.Component {
  add(item = { test: 2 }) {
    const list = [{ test: 1 }];
    this.props.addToShoppingList([...list, item]);
  }

  render() {
    console.log("pprops", this.props);
    return (
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>Add item </h4>
          <p>Add a new item to the current shopping list</p>
          <p>Todo</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
          >
            Close
          </a>
          <a
            onClick={() => this.add()}
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
          >
            Add
          </a>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToShoppingList: (list) => dispatch(addToShoppingList(list)),
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  firestoreConnect(() => {
    return [{ collection: "cafes" }];
  })
)(AddItemDialog);
