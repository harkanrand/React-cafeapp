export const createProduct = (product) => {
  return (dispatch, getState, { getFirebase }) => {
    // make async call to database
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;

    const priceHistory = {
      price: product.price,
      createdBy: authorId,
      dateCreated: new Date(),
    };

    firestore
      .collection('products')
      .add({
        ...product,
        priceHistory: priceHistory,
        createdBy: authorId,
        dateCreated: new Date(),
      })
      .then(() => {
        dispatch({ type: 'CREATE_PRODUCT_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_PRODUCT_ERROR' }, err);
      });
  };
};

export default createProduct;
