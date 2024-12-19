import { combineReducers } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from './slices/BurgerConstructorSlice';
import { feedInfoSlice } from './slices/FeedInfoSlice';
import { ingredientsSlice } from './slices/IngredientsSlice';
import orderSlice from './slices/OrderSlice';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorSlice,
  feedInfo: feedInfoSlice,
  ingredients: ingredientsSlice,
  order: orderSlice
});

export default rootReducer;
