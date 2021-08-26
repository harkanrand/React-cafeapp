export const addToShoppingList = (list) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;

    const shoppingRef = firestore
      .collection("cafes")
      .doc(profile.defaultCafeId)
      .collection("shoppingLists")
      .doc("main");

    if (false)
      shoppingRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          shoppingRef
            .update({
              list,
              updatedBy: authorId,
              dateUpdated: new Date(),
            })
            .then(() => {
              dispatch({ type: "CREATE_SHOPPING_ITEM_SUCCESS" });
            })
            .catch((err) => {
              dispatch({ type: "CREATE_SHOPPING_ITEM_ERROR" }, err);
            });
        } else {
          shoppingRef
            .set({
              list,
              createdBy: authorId,
              dateCreated: new Date(),
            })
            .then(() => {
              dispatch({ type: "CREATE_SHOPPING_ITEM_SUCCESS" });
            })
            .catch((err) => {
              dispatch({ type: "CREATE_SHOPPING_ITEM_ERROR" }, err);
            });
        }
      });
  };
};
