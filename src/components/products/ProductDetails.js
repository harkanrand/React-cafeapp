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
    setLatestPrice: false,
    supplier: false,
    show: false,
  };

  componentDidUpdate() {
    const { product, latestPrice, suppliers } = this.props;
    if (!this.state.set && product && product.name && latestPrice) {
      this.setState({
        set: true,
        items: {
          name: {
            label: "Name",
            value: product?.name,
          },
          description: {
            label: "Description",
            value: product?.description,
          },
          quantity: {
            label: "Quantity",
            value: product?.quantity,
          },

          brand: {
            label: "Brand",
            value: product?.brand,
          },
          sku: {
            label: "Sku",
            value: product?.sku,
          },
          price: {
            label: "Price",
            value: product?.price,
          },
        },
      });
    }

    if (
      !this.state.setLatestPrice &&
      latestPrice &&
      latestPrice.supplierId &&
      suppliers
    ) {
      this.setState({
        supplier: suppliers[latestPrice.supplierId],
        setLatestPrice: true,
      });
    }
  }

  changeValue(key, value) {
    const { items } = this.state;
    items[key].value = value;

    this.setState({ items });
  }

  updateProduct() {
    const { productId } = this.props;

    let item = {};
    Object.entries(this.state.items).forEach(([key, { value }]) => {
      item = { ...item, [key]: value };
    });

    if (this.state.edit)
      this.props.updateProduct(productId, item, this.state.supplier);
    this.setState((prev) => ({ edit: !prev.edit }));
  }

  render() {
    const { product, auth, suppliers, latestPrice } = this.props;
    const { items, edit, supplier, show } = this.state;
    if (!auth.uid) return <Redirect to="/signin" />;

    console.log("latestPrice", supplier);
    if (items) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <EditableDetails
              disabled={!supplier}
              items={items}
              changeValue={this.changeValue.bind(this)}
              action={this.updateProduct.bind(this)}
              edit={this.state.edit}
              renderExtra={() => (
                <div>
                  {edit && (
                    <div>
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
                  )}
                  <br />
                  <div className="col s12">
                    {moment(product.dateCreated.toDate()).calendar()}
                  </div>
                </div>
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
    updateProduct: (productId, product, supplier) =>
      dispatch(updateProduct(productId, product, supplier)),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    suppliers: state.firestore.data.suppliers,
    product: state.firestore.data.product,
    productId: ownProps.match.params.id,
    auth: state.firebase.auth,
    latestPrice: state.firestore.data.latestPrice
      ? Object.values(state.firestore.data.latestPrice)[0]
      : -1,
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
            orderBy: ["dateCreated", "desc"],
            limit: 1,
          },
        ],
        storeAs: "latestPrice",
      },
      {
        collection: "suppliers",
      },
    ];
  })
)(ProductDetails);

const styles = {
  dropdown: {
    left: "inherit",
    top: "inherit",
    padding: 0,
    opacity: 1,
    display: "block",
  },
};
