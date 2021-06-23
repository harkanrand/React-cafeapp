const initState = {};

const cafeReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_CAFE_SUCCESS":
      console.log("create cafe success");
      return state;

    case "CREATE_CAFE_ERROR":
      console.log("create cafe error");
      return state;
    case "UPDATE_CAFE_SUCCESS":
      return { ...state };
    case "UPDATE_CAFE_ERROR":
      return { ...state };

    default:
      return state;
  }
};

export default cafeReducer;
