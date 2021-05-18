import React, { Component } from 'react';
import { connect } from 'react-redux';
import createProduct from '../../store/actions/productActions';
import { Redirect } from 'react-router-dom';

class CreateProduct extends Component {
  state = {
    name: '',
    description: '',
    brand: '',
    sku: '',
    quantity: '',
    price: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProduct(this.state);
    this.props.history.push('/productList');
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/productlist" />;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create New Product</h5>

          <div className="input-field col s12">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="validate" onChange={this.handleChange} />
          </div>

          <div className="input-field col s12">
            <label htmlFor="name">Description</label>
            <input type="text" id="description" onChange={this.handleChange} />
          </div>

          <div className="row">
            <div className="input-field col s9">
              <label htmlFor="brand">Brand</label>
              <input type="text" id="brand" className="validate" onChange={this.handleChange} />
            </div>
            <div className="input-field col s3">
              <label htmlFor="brand">SKU</label>
              <input type="text" id="sku" onChange={this.handleChange} />
            </div>
          </div>
          
          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="price">Price</label>
              <input type="text" id="price" onChange={this.handleChange} />
            </div>

            <div className="input-field col s6">
              <label htmlFor="quantity">Quantity</label>
              <input type="text" id="quantity" onChange={this.handleChange} />
            </div>
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
  // console.log(state);
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: (product) => dispatch(createProduct(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
