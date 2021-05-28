export const createItem = (item) => {
  return (dispatch, getState, { getFirebase }) => {
    // make async call to database
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;
    

    firestore
      .collection('cafes')
      .doc(profile.defaultCafeId)
      .collection('inventoryItems')
      .add({
        ...item,
        createdBy: authorId,
        dateCreated: new Date(),
      })
      .then(() => {
        dispatch({ type: 'CREATE_ITEM_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_ITEM_ERROR' }, err);
      });
  };
};

export const createItemList = (itemList) => {
  
  return (dispatch, getState, { getFirebase }) => {
    // make async call to database
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;

    console.log('profile: ', profile)

    firestore
      .collection('cafes')
      .doc(profile.defaultCafeId)
      .collection('inventoryList')
      .add({
        ...itemList,
        createdBy: authorId,
        dateCreated: new Date(),
      })
      .then(() => {
        dispatch({ type: 'CREATE_ITEM_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_ITEM_ERROR' }, err);
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
      .collection('cafes')
      .doc(profile.defaultCafeId)
      .collection('inventoryList')
      .add({
        ...item,
        createdBy: authorId,
        dateCreated: new Date(),
      })
      .then(() => {
        dispatch({ type: 'CREATE_ITEM_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_ITEM_ERROR' }, err);
      });
  };
};
