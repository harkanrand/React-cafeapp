import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import EditableDetails from "../utils/EditableDetails";
import { updateProduct } from "../../store/actions/productActions";

class ProductDetails extends React.Component {
  state = {
    edit: false,
    quantity: this.props.product?.quantity,
    name: this.props.product?.name,
    price: this.props.product?.price,
    description: this.props.product?.description,
    brand: this.props.product?.brand,
    sku: this.props.product?.sku,
    priceHistory: this.props.product?.priceHistory,
  };

  updateProduct() {
    const { productId } = this.props;

    if (this.state.edit) this.props.updateProduct(productId, { ...this.state });
    this.setState((prev) => ({ edit: !prev.edit }));
  }

  render() {
    const { product, auth } = this.props;

    const items = [
      {
        key: "name",
        label: "Name",
        value: this.state.name,
      },
      {
        key: "description",
        label: "Description",
        value: this.state.description,
      },
      {
        key: "quantity",
        label: "Quantity",
        value: this.state.quantity,
      },
      {
        key: "name",
        label: "Name",
        value: this.state.name,
      },
      {
        key: "price",
        label: "Price",
        value: this.state.price,
      },
      {
        key: "brand",
        label: "Brand",
        value: this.state.brand,
      },
      {
        key: "sku",
        label: "Sku",
        value: this.state.sku,
      },
    ];

    if (!auth.uid) return <Redirect to="/signin" />;

    if (product) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <EditableDetails
              items={items}
              setState={this.setState.bind(this)}
              action={this.updateProduct.bind(this)}
              edit={this.state.edit}
              renderExtra={() => (
                <div> {moment(product.dateCreated.toDate()).calendar()}</div>
              )}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="container center">
          <p>Loading product...</p>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProduct: (productId, product) =>
      dispatch(updateProduct(productId, product)),
  };
};

const mapStateToProps = (state, ownProps) => {
  //console.log(state);

  // Todo: We should get just the specific product from firestore instead of all of the product and then filtering it out here
  const id = ownProps.match.params.id;
  const products = state.firestore.data.products;
  const product = products ? products[id] : null;
  console.log("product: ", product);
  return {
    product: product,
    productId: id,
    auth: state.firebase.auth,
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "products" }])
)(ProductDetails);
