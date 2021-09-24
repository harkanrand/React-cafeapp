const initState = {
  categories: ["", "dairy", "meat", "produce", "cheese", "supplies", "other"],
};

const itemReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_ITEM_SUCCESS":
      return { ...state };
    case "CREATE_ITEM_ERROR":
      return { ...state };
    case "ADD_TO_INVENTORY_SUCCESS":
      return { ...state };
    case "ADD_TO_INVENTORY_ERROR":
      return { ...state };
    case "UPDATE_ITEM_SUCCESS":
      return { ...state };
    case "UPDATE_ITEM_ERROR":
      return { ...state };
    case "CONDUCT_INVENTORY_SUCCESS":
      return { ...state };
    case "CONDUCT_INVENTORY_ERROR":
      return { ...state };
    case "DELETE_INVENTORY_SUCCESS":
      return { ...state };
    case "DELETE_INVENTORY_ERROR":
      return { ...state };
    default:
      return state;
  }
};

export default itemReducer;
