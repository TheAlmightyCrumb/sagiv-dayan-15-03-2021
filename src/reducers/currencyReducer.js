const currencyReducer = (state = 3.3, action) => {
    switch (action.type) {
      case "UPDATE_CURRENCY":
        return parseInt(action.currency)
      default:
        return state;
    }
  };
  
  export default currencyReducer;