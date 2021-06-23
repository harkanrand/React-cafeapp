import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import EditableDetails from "../utils/EditableDetails";
import { updateSupplier } from "../../store/actions/supplierActions";
import moment from "moment";

class SupplierDetails extends React.Component {
  state = {
    edit: false,
    items: {
      name: {
        value: this.props.supplier?.name,
        label: "Name",
      },
      city: {
        value: this.props.supplier?.city,
        label: "City",
      },
      description: {
        value: this.props.supplier?.description,
        label: "Description",
      },
      address: {
        value: this.props.supplier?.address,
        label: "Address",
      },
      contact: {
        value: this.props.supplier?.contact,
        label: "Contact",
      },
      email: {
        value: this.props.supplier?.email,
        label: "Email",
      },
      phoneNumber: {
        value: this.props.supplier?.phoneNumber,
        label: "Phone number",
      },
      zip: {
        value: this.props.supplier?.zip,
        label: "Zip",
      },
      state: {
        value: this.props.supplier?.state,
        label: "State",
      },
      nickName: {
        value: this.props.supplier?.nickName,
        label: "Nickname",
      },
    },
  };

  changeValue(key, value) {
    const { items } = this.state;
    items[key].value = value;

    this.setState({ items });
  }

  updateSupplier() {
    const { supplierId } = this.props;

    let item = {};
    Object.entries(this.state.items).forEach(([key, { value }]) => {
      item = { ...item, [key]: value };
    });

    if (this.state.edit)
      this.props.updateSupplier(supplierId, {
        ...item,
      });
    this.setState((prev) => ({ edit: !prev.edit }));
  }

  render() {
    const { auth, supplier } = this.props;
    const { items } = this.state;

    if (!auth.uid) return <Redirect to="/signin" />;

    if (supplier) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <EditableDetails
              items={items}
              changeValue={this.changeValue.bind(this)}
              action={this.updateSupplier.bind(this)}
              edit={this.state.edit}
              renderExtra={() => (
                <div> {moment(supplier.dateCreated.toDate()).calendar()}</div>
              )}
            />
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSupplier: (supplierId, supplier) =>
      dispatch(updateSupplier(supplierId, supplier)),
  };
};
const mapStateToProps = (state, ownProps) => {
  // Todo: We should get just the specific supplier from firestore instead of all of the supplier and then filtering it out here
  const id = ownProps.match.params.id;
  const suppliers = state.firestore.data.suppliers;
  const supplier = suppliers ? suppliers[id] : null;
  console.log("supplier: ", supplier);
  return {
    supplier: supplier,
    supplierId: id,
    auth: state.firebase.auth,
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "suppliers" }])
)(SupplierDetails);
