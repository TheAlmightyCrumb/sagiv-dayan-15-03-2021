import { v4 as uuidv4 } from 'uuid';

export const addProduct = (product) => ({
    type: "ADD",
    id: uuidv4(),
    ...product
})

export const toggleProduct = (id) => ({
    type: "TOGGLE",
    id
})

export const updateCurrency = (newCurrency) => ({
    type: "UPDATE_CURRENCY",
    value: newCurrency
})

export const changeCurrencyView = (newView) => ({
    type: "CHANGE_CURRENCY_VIEW",
    view: newView
})

export const setViewState = (filter) => ({
    type: "SET_VIEW_STATE",
    filter
  });
  