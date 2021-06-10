export const createProduct = (product) => {
  return (dispatch, getState, { getFirebase }) => {
    // make async call to database
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;

    const priceHistory = [
      {
        price: product.price,
        createdBy: authorId,
        dateCreated: new Date(),
      },
    ];

    firestore
      .collection("products")
      .add({
        ...product,
        priceHistory: priceHistory,
        createdBy: authorId,
        dateCreated: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_PRODUCT_SUCCESS" });
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

    const priceHistory = [
      ...product.priceHistory,
      {
        price: product.price,
        createdBy: authorId,
        dateCreated: new Date(),
      },
    ];

    delete product.edit;

    firestore
      .collection("products")
      .doc(productId)
      .update({
        ...product,
        priceHistory,
        updatedBy: authorId,
        dateUpdated: new Date(),
      })
      .then(() => {
        dispatch({ type: "UPDATE_PRODUCT_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_PRODUCT_ERROR" }, err);
      });
  };
};

export default createProduct;
