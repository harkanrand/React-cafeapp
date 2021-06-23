export const createCafe = (cafe) => {
  return (dispatch, getState, { getFirebase }) => {
    // make async call to database
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;

    const cafeAddress = {
      address: cafe.address,
      city: cafe.city,
      state: cafe.state,
      zip: cafe.zip,
    };

    firestore
      .collection("cafes")
      .add({
        name: cafe.name,
        address: cafeAddress,
        phoneNumber: cafe.phoneNumber,
        createdBy: authorId,
        dateCreated: new Date(),
      })
      .then(function (docRef) {
        firestore
          .collection("users")
          .doc(authorId)
          .update({ defaultCafeId: docRef.id });
        firestore
          .collection("users")
          .doc(authorId)
          .update({ defaultCafeName: cafe.name });
      })
      .then(() => {
        dispatch({ type: "CREATE_CAFE_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_CAFE_ERROR" }, err);
      });
  };
};

export const updateCafe = (cafeId, cafe) => {
  return (dispatch, getState, { getFirebase }) => {
    // make async call to database
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;

    const cafeAddress = {
      address: cafe.address,
      city: cafe.city,
      state: cafe.state,
      zip: cafe.zip,
    };

    firestore
      .collection("cafes")
      .doc(cafeId)
      .update({
        name: cafe.name,
        address: cafeAddress,
        phoneNumber: cafe.phoneNumber,
        updatedBy: authorId,
        dateUpdated: new Date(),
      })
      .then(function (docRef) {
        firestore
          .collection("users")
          .doc(authorId)
          .update({ defaultCafeName: cafe.name });
      })
      .then(() => {
        dispatch({ type: "UPDATE_CAFE_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_CAFE_ERROR" }, err);
      });
  };
};

export default createCafe;
