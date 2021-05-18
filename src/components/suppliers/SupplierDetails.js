import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

export const SupplierDetails = (props) => {
  //const id = props.match.params.id;
  const { supplier, auth } = props;
  //  let priceBlock = '';

  if (!auth.uid) return <Redirect to="/signin" />;

  if (supplier) {
    /*    if (supplier.price != null) {
      priceBlock = <p>price: {supplier.price}</p>;
    } else {
      priceBlock = <p>price: --</p>;
    }
*/
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{supplier.name}
            <h6>({supplier.nickName})</h6></span>

            <p>Address:</p>
            <p>{supplier.address}</p>
            <p>{supplier.city}, {supplier.state} {supplier.zip}</p>
            <p>Phone:{supplier.phoneNumber}</p>
            <p>Email:{supplier.email}</p>
          </div>

          <div className="card-action white ligthen-4 grey-text">
            <p>Description: {supplier.description}</p>
            {moment(supplier.dateCreated.toDate()).calendar()}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading supplier...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  //console.log(state);

  // Todo: We should get just the specific supplier from firestore instead of all of the supplier and then filtering it out here
  const id = ownProps.match.params.id;
  const suppliers = state.firestore.data.suppliers;
  const supplier = suppliers ? suppliers[id] : null;
  console.log('supplier: ', supplier);
  return {
    supplier: supplier,
    auth: state.firebase.auth,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'suppliers' }])
)(SupplierDetails);
