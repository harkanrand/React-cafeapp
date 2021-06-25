import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import EditableDetails from "../utils/EditableDetails";
import { updateCafe } from "../../store/actions/cafeActions";
import moment from "moment";

class CafeDetails extends React.Component {
  state = {
    edit: false,
    set: false,
  };

  componentDidUpdate() {
    const { cafe } = this.props;
    if (!this.state.set && cafe && cafe.name) {
      this.setState({
        set: true,
        items: {
          name: {
            value: this.props.cafe?.name,
            label: "Name",
          },
          city: {
            value: this.props.cafe?.address?.city,
            label: "City",
          },
          address: {
            value: this.props.cafe?.address?.address,
            label: "Address",
          },
          phoneNumber: {
            value: this.props.cafe?.phoneNumber,
            label: "Phone number",
          },
          zip: {
            value: this.props.cafe?.address?.zip,
            label: "Zip",
          },
          state: {
            value: this.props.cafe?.address?.state,
            label: "State",
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

  updateCafe() {
    const { cafeId } = this.props;

    let item = {};
    Object.entries(this.state.items).forEach(([key, { value }]) => {
      item = { ...item, [key]: value };
    });

    if (this.state.edit)
      this.props.updateCafe(cafeId, {
        ...item,
      });
    this.setState((prev) => ({ edit: !prev.edit }));
  }

  render() {
    const { auth, cafe } = this.props;
    const { items } = this.state;

    console.log("cafe", cafe);
    if (!auth.uid) return <Redirect to="/signin" />;

    if (items) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <EditableDetails
              items={items}
              changeValue={this.changeValue.bind(this)}
              action={this.updateCafe.bind(this)}
              edit={this.state.edit}
              renderExtra={() => (
                <div> {moment(cafe.dateCreated.toDate()).calendar()}</div>
              )}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="container center">
          <p>Loading cafe...</p>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCafe: (cafeId, cafe) => dispatch(updateCafe(cafeId, cafe)),
  };
};

const mapStateToProps = (state, ownProps) => {
  // Todo: We should get just the specific supplier from firestore instead of all of the supplier and then filtering it out here
  const id = ownProps.match.params.id;
  const cafes = state.firestore.data.cafes;
  const cafe = cafes ? cafes[id] : null;
  return {
    cafe,
    cafeId: id,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "cafes" }])
)(CafeDetails);
