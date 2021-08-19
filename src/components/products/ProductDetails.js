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
    set: false,
  };

  componentDidUpdate() {
    const { product } = this.props;
    if (!this.state.set && product && product.name) {
      this.setState({
        set: true,
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
      });
    }
  }

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

    if (this.state.edit) this.props.updateProduct(productId, item);
    this.setState((prev) => ({ edit: !prev.edit }));
  }

  render() {
    console.log(this.props);
    const { product, auth } = this.props;
    const { items } = this.state;
    if (!auth.uid) return <Redirect to="/signin" />;

    if (items) {
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
  return {
    product: state.firestore.data.product,
    productId: ownProps.match.params.id,
    auth: state.firebase.auth,
    priceHistory: state.firestore.data.priceHistory,
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props, ownProps) => {
    if (!ownProps.match.params.id) {
      return [];
    }

    return [
      {
        collection: "products",
        doc: ownProps.match.params.id,
        storeAs: "product",
      },
      {
        collection: "products",
        doc: ownProps.match.params.id,
        subcollections: [
          {
            collection: "priceHistory",
          },
        ],
        storeAs: "priceHistory",
      },
    ];
  })
)(ProductDetails);
