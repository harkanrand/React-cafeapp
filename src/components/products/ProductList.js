import React, { Component } from "react";
import ProductSummary from "./ProductSummary";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

class ProductList extends Component {
  render() {
    const { products, auth } = this.props;
    console.log("wjod", this.props);
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="product container">
        <div className="row">
          <div className="product-list section">
            {products &&
              products.map((product) => {
                return (
                  <Link to={"/product/" + product.id} key={product.id}>
                    <ProductSummary product={product} />
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="row">
          <NavLink to="/createProduct">
            <button className="waves-effect waves-light btn pink lighten-1 z-depth-0">
              Add New Product
            </button>
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    products: state.firestore.ordered.products,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "products" }])
)(ProductList);
