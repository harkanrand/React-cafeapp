const initState = {};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_ITEM':
      console.log('create users success');
      return state;

    case 'CREATE_ITEM_ERROR':
      console.log('create users error');
      return state;

    default:
      return state;
  }
};

export default usersReducer;
