const currencyReducer = (state = { value: 3.3, view: "USD"}, action) => {
    switch (action.type) {
      case "UPDATE_CURRENCY":
        return {
          ...state,
          value: parseInt(action.value)
        }
      case "CHANGE_CURRENCY_VIEW":
        return {
          ...state,
          view: action.view
        }
      default:
        return state;
    }
  };
  
  export default currencyReducer;