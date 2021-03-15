const productReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          store: action.store,
          estimatedArrivalDate: action.estimatedArrivalDate,
          delivered: false,
        },
      ];
    case "TOGGLE":
      return state.map((prod) => {
        return prod.id === action.id
          ? { ...prod, delivered: !prod.delivered }
          : prod;
      });
    default:
      return state;
  }
};

export default productReducer;
