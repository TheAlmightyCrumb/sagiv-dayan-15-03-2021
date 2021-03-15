const storeReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      return state.find((store) => store.name === action.store)
        ? state.map((store) => {
            return store.name === action.store
              ? {
                  ...store,
                  quantity: store.quantity + 1,
                  price: store.price + action.price,
                }
              : store;
          })
        : [...state, { name: action.store, quantity: 1, price: action.price }];
    default:
      return state;
  }
};

export default storeReducer;