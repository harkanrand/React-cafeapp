import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../store/actions/itemActions';
import { Redirect } from 'react-router-dom';

class EditInventoryList extends Component {
  state = {
    itemId: '',
    listId: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state);
    this.props.createItem(this.state);
    this.props.history.push('/itemList');
  };

  render() {
    const { auth } = this.props;
    //   console.log(this.props);
    if (!auth.uid) return <Redirect to="/itemList" />;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create New Item</h5>

          <div className="input-field">
            <label htmlFor="name">name</label>
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
            <label htmlFor="par">par amount</label>
            <input type="text" id="par" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //  console.log(state);
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(addItem);
