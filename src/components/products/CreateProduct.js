import React, { Component } from "react";
import { connect } from "react-redux";
import createProduct from "../../store/actions/productActions";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class CreateProduct extends Component {
  state = {
    name: "",
    description: "",
    brand: "",
    sku: "",
    quantity: "",
    price: "",
    supplier: "",
    show: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    const {
      name,
      description,
      brand,
      sku,
      quantity,
      price,
      supplier,
    } = this.state;
    e.preventDefault();
    this.props.createProduct(
      {
        name,
        description,
        brand,
        sku,
        quantity,
        price,
      },
      supplier
    );
    this.props.history.push("/products");
  };

  render() {
    const { auth, suppliers } = this.props;
    const { show, supplier } = this.state;
    if (!auth.uid) return <Redirect to="/products" />;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create New Product</h5>

          <div className="input-field col s12">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="validate"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field col s12">
            <label htmlFor="name">Description</label>
            <input type="text" id="description" onChange={this.handleChange} />
          </div>

          <div className="row">
            <div className="input-field col s9">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                className="validate"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field col s3">
              <label htmlFor="brand">SKU</label>
              <input type="text" id="sku" onChange={this.handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s4">
              <label htmlFor="price">Price</label>
              <input type="text" id="price" onChange={this.handleChange} />
            </div>

            <div className="input-field col s4">
              <a
                className="dropdown-trigger btn"
                onClick={() => this.setState({ show: true })}
              >
                {supplier ? supplier.name : "Select Supplier"}
              </a>
              <ul
                style={show ? styles.dropdown : {}}
                className="dropdown-content"
              >
                {suppliers &&
                  Object.entries(suppliers)?.map(
                    ([key, value], i) =>
                      value && (
                        <li key={i}>
                          <a
                            onClick={() =>
                              this.setState({
                                supplier: { ...value, id: key },
                                show: false,
                              })
                            }
                          >
                            {value.name}
                          </a>
                        </li>
                      )
                  )}
              </ul>
            </div>

            <div className="input-field col s4">
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

const mapStateToProps = (state, ownProps) => {
  return {
    suppliers: state.firestore.data.suppliers,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: (product, supplier) =>
      dispatch(createProduct(product, supplier)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "suppliers" }])
)(CreateProduct);

const styles = {
  dropdown: {
    left: "inherit",
    top: "inherit",
    padding: 0,
    opacity: 1,
    display: "block",
  },
};
