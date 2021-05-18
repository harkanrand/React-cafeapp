const initState = {};

const supplierReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_SUPPLIER_SUCCESS':
      console.log('create supplier success');
      return state;

    case 'CREATE_SUPPLIER_ERROR':
      console.log('create supplier error');
      return state;

    default:
      return state;
  }
};

export default supplierReducer;
