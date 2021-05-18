import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
//import { NavLink } from 'react-router-dom';

class SupplierList extends Component {
  render() {
    const { suppliers, auth } = this.props;
    console.log(this.props);
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="supplier container">
        <div className="row">
          <div className="supplier-list section">
            {suppliers &&
              suppliers.map((supplier) => {
                return (
                  <Link to={'/supplier/' + supplier.id} key={supplier.id}>
                    <div className="card z-depth-0 project-summary" >
                      <div className="card-content grey-text text-darken-3">
                        <span className="card-title" >{supplier.nickName}
                          <h6>{supplier.name}</h6>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="row">
          <Link to="/addSupplier">
            <button className="waves-effect waves-light btn pink lighten-1 z-depth-0">
              Add New Supplier
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    suppliers: state.firestore.ordered.suppliers,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'suppliers',
    orderByValue: ('name', 'dsc') }])
)(SupplierList);
