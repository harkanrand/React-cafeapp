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
    items: {
      name: {
        label: "Name",
        value: this.props.product?.name,
      },
      description: {
        label: "Description",
        value: this.props.product?.description,
      },
      quantity: {
        label: "Quantity",
        value: this.props.product?.quantity,
      },
      price: {
        label: "Price",
        value: this.props.product?.price,
      },
      brand: {
        label: "Brand",
        value: this.props.product?.brand,
      },
      sku: {
        label: "Sku",
        value: this.props.product?.sku,
      },
    },
  };

  changeValue(key, value) {
    const { items } = this.state;
    items[key].value = value;

    this.setState({ items });
  }

  updateProduct() {
    const { productId, product } = this.props;

    let item = {};
    Object.entries(this.state.items).forEach(([key, { value }]) => {
      item = { ...item, [key]: value };
    });

    if (this.state.edit)
      this.props.updateProduct(productId, {
        ...item,
        priceHistory: product?.priceHistory,
      });
    this.setState((prev) => ({ edit: !prev.edit }));
  }

  render() {
    const { product, auth } = this.props;
    const { items } = this.state;
    if (!auth.uid) return <Redirect to="/signin" />;

    if (product) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <EditableDetails
              items={items}
              changeValue={this.changeValue.bind(this)}
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
