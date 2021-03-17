const storeReducer = (state = { list: [], totalPrice: 0 }, action) => {
  switch (action.type) {
    case "ADD":
      return state.list.find((store) => store.name === action.store)
        ? {
            list: state.list.map((store) => {
              return store.name === action.store
                ? {
                    ...store,
                    quantity: store.quantity + 1,
                    price: parseInt(store.price) + parseInt(action.price),
                  }
                : store;
            }),
            totalPrice: state.totalPrice + parseInt(action.price),
          }
        : {
            list: [
              ...state.list,
              {
                name: action.store,
                quantity: 1,
                price: parseInt(action.price),
              },
            ],
            totalPrice: state.totalPrice + parseInt(action.price),
          };
    default:
      return state;
  }
};

export default storeReducer;
