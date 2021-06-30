export const createItem = (item) => {
  return (dispatch, getState, { getFirebase }) => {
    // make async call to database
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;

    delete item.show;

    firestore
      .collection("cafes")
      .doc(profile.defaultCafeId)
      .collection("inventoryItems")
      .add({
        ...item,
        createdBy: authorId,
        dateCreated: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_ITEM_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_ITEM_ERROR" }, err);
      });
  };
};

export const createItemList = (itemList) => {
  return (dispatch, getState, { getFirebase }) => {
    // make async call to database
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;

    console.log("profile: ", profile);

    firestore
      .collection("cafes")
      .doc(profile.defaultCafeId)
      .collection("inventoryList")
      .add({
        ...itemList,
        createdBy: authorId,
        dateCreated: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_ITEM_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_ITEM_ERROR" }, err);
      });
  };
};

export const addItem = (item) => {
  return (dispatch, getState, { getFirebase }) => {
    // make async call to database
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;

    firestore
      .collection("cafes")
      .doc(profile.defaultCafeId)
      .collection("inventoryList")
      .add({
        ...item,
        createdBy: authorId,
        dateCreated: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_ITEM_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_ITEM_ERROR" }, err);
      });
  };
};

export const addItemToList = (listId, item) => {
  return (dispatch, getState, { getFirebase }) => {
    // make async call to database
    const firestore = getFirebase().firestore();
    const { inventoryLists } = getState()?.firestore?.data;
    const profile = getState().firebase.profile;

    const items = inventoryLists[listId]?.items;
    firestore
      .collection("cafes")
      .doc(profile.defaultCafeId)
      .collection("inventoryList")
      .doc(listId)
      .update({
        items: [...items, item],
        dateUpdated: new Date(),
        itemCount: items.length + 1,
      })
      .then(() => {
        dispatch({
          type: "ADD_TO_INVENTORY_SUCCESS",
        });
      })
      .catch((err) => {
        dispatch({ type: "ADD_TO_INVENTORY_ERROR" }, err);
      });
  };
};

export const updateItem = (itemId, item) => {
  return (dispatch, getState, { getFirebase }) => {
    // make async call to database
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;

    firestore
      .collection("cafes")
      .doc(profile.defaultCafeId)
      .collection("inventoryItems")
      .doc(itemId)
      .update({
        ...item,
      })
      .then(() => {
        dispatch({
          type: "UPDATE_ITEM_SUCCESS",
        });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_ITEM_ERROR" }, err);
      });
  };
};
