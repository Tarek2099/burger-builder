import * as actionTypes from "./actionTypes"

const INITIAL_STATES = {
  Ingredient: [
    { type: "salad", amount: 0 },
    { type: "meat", amount: 0 },
    { type: "cheese", amount: 0 },
  ],
  totalPrice: 10,
  purchasable: false,
  orders: [],
  loadOrders: true,
  orderErrors: false,
  token: null,
  userId: null,
  authLoading: false,
  authFailed: null,
}
const INGREDIENT_PRICE = {
  salad: 5,
  meat: 8,
  cheese: 5,
};

export const Reducer = (state = INITIAL_STATES, action) => {
      const Ingredients = [...state.Ingredient];
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      for (let items of Ingredients) {
        if (items.type === action.payload) items.amount++;
      }
      return {
        ...state,
        Ingredient: Ingredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payload],
      }
    case actionTypes.REMOVE_INGREDIENT:
      for (let items of Ingredients) {
        if (items.type === action.payload) {
          if (items.amount <= 0) return state;
           items.amount--;
        }
      }
      return {
        ...state,
        Ingredient: Ingredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payload],
      }
    case actionTypes.PURCHASBLE:
      const sum = state.Ingredient.reduce((sum, element) => {
        return sum + element.amount;
      }, 0)
      return {
        ...state,
        purchasable: sum > 0
      }
    
    case actionTypes.RESET_INGREDIENT:
      return {
        ...state,
         Ingredient: [
    { type: "salad", amount: 0 },
    { type: "meat", amount: 0 },
    { type: "cheese", amount: 0 },
  ],
  totalPrice: 10,
  purchasable: false,
      }   

    
    case actionTypes.LOAD_ORDER:
    let orders=[]
      for (let key in action.payload) {
        orders.push({
          ...action.payload[key],
          id: key,
        })
      }

      return {
        ...state,
        orders: orders,
        loadOrders: false,
      }

    case actionTypes.LOAD_ORDER_FAILED:
      return {
        ...state,
        orderErrors: true,
        loadOrders: false,
      }


      // For Authentication
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId
      }
    
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        authFailed: null,
        token: null,
        userId: null
      }
    case actionTypes.AUTH_LOADING:
      return {
        ...state,
        authLoading: action.payload
      }
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        authFailed: action.payload
      }
    
    default:
      return state;
  }
}