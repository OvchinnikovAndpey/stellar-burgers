import { combineReducers } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from './slices/BurgerConstructorSlice';
import { feedInfoSlice } from './slices/FeedInfoSlice';
import orderSlice from './slices/OrderSlice';
import ingredientsSlice from './slices/IngredientsSlice';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorSlice,
  feedInfo: feedInfoSlice,
  ingredients: ingredientsSlice,
  order: orderSlice
});

export default rootReducer;
