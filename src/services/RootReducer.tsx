import { combineReducers } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from './slices/BurgerConstructorSlice';
import { feedInfoSlice } from './slices/FeedInfoSlice';
import { ingredientsSlice } from './slices/IngredientsSlice';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorSlice,
  feedInfo: feedInfoSlice,
  ingredients: ingredientsSlice
});

export default rootReducer;
