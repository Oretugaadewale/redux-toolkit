import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "./modal/ModalSlice";

const url = 'https://course-api.com/react-useReducer-cart-project';


// to create state
// cart initial state
const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', async (name,thunkAPI) =>{
  try {
    // console.log(name)
    // console.log(thunkAPI)
    // console.log(thunkAPI.getState())
 
  // thunkAPI.dispatch(openModal())
  const resp = await axios(url) 
  // console.log(resp)
  return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
}
});

//to create slice for the cart
//everything you wanna do on the cart slice will be in the reducer
// clear cart
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //This is the Action clear cart
    clearCart: (state) => {
      // we can return a new state, but whatever we return from the reducer will be our new state value
      state.cartItems = [];
      // return {cartItems:[]}
    },
      removeItem: (state, action) => {
        //   console.log(action);
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      },
      //we destructure the payload here and its an object
      increase: (state, { payload }) => {
          const cartItem = state.cartItems.find((item) => item.id === payload.id);
          //the amount here is this specific cart item not total 
        cartItem.amount = cartItem.amount + 1;
      },
       //we destructure the payload here and its an object
       decrease: (state, { payload }) => {
        const cartItem = state.cartItems.find((item) => item.id === payload.id);
        //the amount here is this specific cart item not total 
      cartItem.amount = cartItem.amount - 1;
      },
      calculateTotals: (state) => {
        let amount = 0;
        let total = 0;
        state.cartItems.forEach((item) => {
          amount += item.amount;
          total += item.amount * item.price;
        });
        state.amount = amount;
        state.total = total;
    },
  },
    //life cycle action
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state) => {
      state.isLoading = true;
    }).addCase(getCartItems.fulfilled, (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    }).addCase(getCartItems.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
    });
  },
});

// console.log(CartSlice)

export const { clearCart, removeItem, increase, decrease, calculateTotals } = CartSlice.actions;

export default CartSlice.reducer;
