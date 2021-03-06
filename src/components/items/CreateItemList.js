import React, { Component } from "react";
import { connect } from "react-redux";
import { createItemList } from "../../store/actions/itemActions";
import { Redirect } from "react-router-dom";

class CreateItemList extends Component {
  state = {
    name: "",
    description: "",
    items: [],
    itemCount: 0,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createItemList(this.state);
    this.props.history.push("/inventoryLists");
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/items" />;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create New Inventory List</h5>

          <div className="input-field">
            <label htmlFor="name">List name</label>
            <input type="text" id="name" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="materialize-textarea"
              onChange={this.handleChange}
            ></textarea>
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Next</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createItemList: (itemList) => dispatch(createItemList(itemList)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateItemList);
