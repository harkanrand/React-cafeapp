const initState = {};

const itemReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_ITEM_SUCCESS":
      console.log("create item success");
      return state;

    case "CREATE_ITEM_ERROR":
      console.log("create item error");
      return state;
    case "ADD_TO_INVENTORY_SUCCESS":
      return state;
    case "ADD_TO_INVENTORY_ERROR":
      return state;
    default:
      return state;
  }
};

export default itemReducer;
