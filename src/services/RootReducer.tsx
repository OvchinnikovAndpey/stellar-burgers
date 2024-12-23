import { combineReducers } from '@reduxjs/toolkit';
import burgerConstructorSlice from './slices/BurgerConstructorSlice';
import feedInfoSlice from './slices/FeedInfoSlice';
import orderSlice from './slices/OrderSlice';
import ingredientsSlice from './slices/IngredientsSlice';
import userSlice from './slices/UserSlice';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorSlice,
  feedInfo: feedInfoSlice,
  ingredients: ingredientsSlice, // Убедитесь, что здесь используется 'ingredients'
  order: orderSlice,
  user: userSlice
});

export default rootReducer;