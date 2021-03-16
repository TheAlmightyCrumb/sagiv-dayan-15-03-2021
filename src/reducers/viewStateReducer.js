const viewStateReducer = (state = "SHOW_WAITING", action) => {
    switch (action.type) {
      case "SET_VIEW_STATE":
        return action.filter;
      default:
        return state;
    }
  };
  
  export default viewStateReducer;
  