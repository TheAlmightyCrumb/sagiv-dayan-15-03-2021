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
    currency: newCurrency
})