import React, { Component } from 'react';
import { connect } from 'react-redux';
import createCafe from '../../store/actions/cafeActions';
import { Redirect } from 'react-router-dom';

class CreateCafe extends Component {
  state = {
    name: '',
    address: '',
    city: '',
    state: '',
    phoneNumber: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state);
    this.props.createCafe(this.state);
    this.props.history.push('/cafe');
  };

  render() {
    const { auth } = this.props;
//    console.log(this.props);
    if (!auth.uid) return <Redirect to="/cafe" />;

    return (
      <div className="container">
        <h5 className="grey-text text-darken-3">Create New Cafe</h5>

        <form onSubmit={this.handleSubmit} className=" col s12 white">
          <div className="input-field row col s12">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="validate" onChange={this.handleChange}/>
          </div>

          <div className="input-field row col s12">
            <label htmlFor="brand">Address </label>
            <input type="text" id="address" onChange={this.handleChange} />
          </div>

          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="quantity">City</label>
              <input type="text" id="city" className="validate" onChange={this.handleChange} />
            </div>

            <div className="input-field col s3">
              <label htmlFor="quantity">State</label>
              <input type="text" id="state" className="validate" onChange={this.handleChange} />
            </div>

            <div className="input-field col s3">
              <label htmlFor="quantity">Zip</label>
              <input type="text" id="zip" onChange={this.handleChange} />
            </div>
          </div>

          <div className="input-field row col s12">
            <label htmlFor="quantity">Phone Number (xxx-xxx-xxxx)</label>
            <input type="tel" id="phoneNumber" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={this.handleChange} />
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
  console.log(state);
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCafe: (cafe) => dispatch(createCafe(cafe)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCafe);
