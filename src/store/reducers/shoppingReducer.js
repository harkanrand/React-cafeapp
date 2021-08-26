const initState = {};

const shoppingReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_SHOPPING_ITEM_SUCCESS":
      return state;

    case "CREATE_SHOPPING_ITEM_ERROR":
      return state;

    default:
      return state;
  }
};

export default shoppingReducer;
