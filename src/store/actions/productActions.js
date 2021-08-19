export const createProduct = (product) => {
  return (dispatch, getState, { getFirebase }) => {
    // make async call to database
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;

    firestore
      .collection("products")
      .add({
        ...product,
        price: parseFloat(product.price),
        createdBy: authorId,
        dateCreated: new Date(),
      })
      .then((doc) => {
        firestore
          .collection("products")
          .doc(doc.id)
          .collection("priceHistory")
          .add({
            price: parseFloat(product.price),
            createdBy: authorId,
            dateCreated: new Date(),
          })
          .then(() => {
            dispatch({ type: "CREATE_PRODUCT_SUCCESS" });
          })
          .catch((err) => {
            dispatch({ type: "CREATE_PRODUCT_ERROR" }, err);
          });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_PRODUCT_ERROR" }, err);
      });
  };
};

export const updateProduct = (productId, product) => {
  return (dispatch, getState, { getFirebase }) => {
    // make async call to database
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;

    firestore
      .collection("products")
      .doc(productId)
      .update({
        ...product,
        price: parseFloat(product.price),
        updatedBy: authorId,
        dateUpdated: new Date(),
      })
      .then(() => {
        firestore
          .collection("products")
          .doc(productId)
          .collection("priceHistory")
          .add({
            price: parseFloat(product.price),
            createdBy: authorId,
            dateCreated: new Date(),
          })
          .then(() => {
            dispatch({ type: "UPDATE_PRODUCT_SUCCESS" });
          })
          .catch((err) => {
            dispatch({ type: "UPDATE_PRODUCT_ERROR" }, err);
          });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_PRODUCT_ERROR" }, err);
      });
  };
};

export default createProduct;
