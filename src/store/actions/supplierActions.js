export const createSupplier = (supplier) => {
  return (dispatch, getState, { getFirebase }) => {
    // make async call to database
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;

    firestore
      .collection('suppliers')
      .add({
        ...supplier,
        authorId: authorId,
        dateCreated: new Date(),
      })
      .then(() => {
        dispatch({ type: 'CREATE_SUPPLIER_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_SUPPLIER_ERROR' }, err);
      });
  };
};

export default createSupplier;
