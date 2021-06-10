export const createSupplier = (supplier) => {
  return (dispatch, getState, { getFirebase }) => {
    // make async call to database
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;

    firestore
      .collection("suppliers")
      .add({
        ...supplier,
        authorId: authorId,
        dateCreated: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_SUPPLIER_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_SUPPLIER_ERROR" }, err);
      });
  };
};

export const updateSupplier = (supplierId, supplier) => {
  return (dispatch, getState, { getFirebase }) => {
    // make async call to database
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;

    delete supplier.edit;

    firestore
      .collection("suppliers")
      .doc(supplierId)
      .update({
        ...supplier,
        authorId: authorId,
        dateUpdated: new Date(),
      })
      .then(() => {
        dispatch({ type: "UPDATE_SUPPLIER_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_SUPPLIER_ERROR" }, err);
      });
  };
};

export default createSupplier;
