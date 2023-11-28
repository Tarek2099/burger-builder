import * as actionTypes from "./actionTypes.js"
import axios from "axios"


export const addingredients= types => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: types,
    }
}

export const removeingredients = types => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: types,
    }
}

export const purchasble = () => {
    return {
        type: actionTypes.PURCHASBLE
    }
}

export const resetIngredient = () => {
    return {
        type: actionTypes.RESET_INGREDIENT
    }
}

export const loadOrder=order=>{
    return{
        type: actionTypes.LOAD_ORDER,
        payload: order,
    }
}

export const loadOrderFailed = () => {
    return {
        type: actionTypes.LOAD_ORDER_FAILED
    }
}


export const fetchData = () =>dispatch=> {
    axios.get(
      "https://burger-builder-36045-default-rtdb.firebaseio.com/orders.json"
    )
        .then(response => {
        dispatch(loadOrder(response.data))
        })
    .catch(error=>dispatch(loadOrderFailed()))
}