import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

export const ProductDetails = (props) => {
  //const id = props.match.params.id;
  const { product, auth } = props;
  //  let priceBlock = '';

  if (!auth.uid) return <Redirect to="/signin" />;

  if (product) {
    /*    if (product.price != null) {
      priceBlock = <p>price: {product.price}</p>;
    } else {
      priceBlock = <p>price: --</p>;
    }
*/
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{product.name}</span>
            <p>{product.brand}</p>
            {product.price ? <p>price: {product.price}</p> : <p>price: --</p>}
            <p>quantity: {product.quantity}</p>
          </div>

          <div className="card-action white ligthen-4 grey-text">
            <p>SKU: {product.sku}</p>
            {moment(product.dateCreated.toDate()).calendar()}
          </div>
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
};

const mapStateToProps = (state, ownProps) => {
  //console.log(state);

  // Todo: We should get just the specific product from firestore instead of all of the product and then filtering it out here
  const id = ownProps.match.params.id;
  const products = state.firestore.data.products;
  const product = products ? products[id] : null;
  console.log('product: ', product);
  return {
    product: product,
    auth: state.firebase.auth,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'products' }])
)(ProductDetails);
