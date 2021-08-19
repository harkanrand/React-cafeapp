import React, { Component } from "react";
import { connect } from "react-redux";
import createSupplier from "../../store/actions/supplierActions";
import { Redirect } from "react-router-dom";

class CreateSupplier extends Component {
  state = {
    name: "",
    address: "",
    city: "",
    state: "",
    phoneNumber: "",
    contact: "",
    email: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createSupplier(this.state);
    this.props.history.push("/suppliers");
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/products" />;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create New Supplier</h5>

          <div className="input-field col s12">
            <label htmlFor="name">Business Name</label>
            <input
              type="text"
              id="name"
              className="validate"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field col s12">
            <label htmlFor="name">Business Nick Name</label>
            <input type="text" id="nickName" onChange={this.handleChange} />
          </div>

          <div className="input-field col s12">
            <label htmlFor="name">Description</label>
            <input type="text" id="description" onChange={this.handleChange} />
          </div>

          <div className="input-field row col s12">
            <label htmlFor="brand">Address </label>
            <input type="text" id="address" onChange={this.handleChange} />
          </div>

          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="quantity">City</label>
              <input
                type="text"
                id="city"
                className="validate"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field col s3">
              <label htmlFor="quantity">State</label>
              <input
                type="text"
                id="state"
                className="validate"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field col s3">
              <label htmlFor="quantity">Zip</label>
              <input type="text" id="zip" onChange={this.handleChange} />
            </div>
          </div>

          <div className="input-field row col s12">
            <label htmlFor="quantity">Phone Number (xxx-xxx-xxxx)</label>
            <input
              type="tel"
              id="phoneNumber"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field row col s12">
            <label htmlFor="quantity">Contact Name</label>
            <input type="text" id="contact" onChange={this.handleChange} />
          </div>

          <div className="input-field row col s12">
            <label htmlFor="quantity">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
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
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createSupplier: (supplier) => dispatch(createSupplier(supplier)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSupplier);
