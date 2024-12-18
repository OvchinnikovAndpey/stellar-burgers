import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { nanoid } from 'nanoid';

export type TBurgerConstructor = {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructor = { bun: null, ingredients: [] };

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addBun: (state, action: PayloadAction<TIngredient>) => {
            state.bun = action.payload;
        },
        addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
            state.ingredients.push({ ...action.payload, id: nanoid() });
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.ingredients = state.ingredients.filter((item) => item.id !== action.payload);
        },
        moveIngredientUp: (state, action: PayloadAction<string>) => {
            const index = state.ingredients.findIndex((item) => item.id === action.payload);
            if (index !== -1) {
                state.ingredients.splice(index, 1);
                state.ingredients.splice(index - 1, 0, state.ingredients[index]);
            }
        },
        moveIngredientDown: (state, action: PayloadAction<string>) => {
            const index = state.ingredients.findIndex((item) => item.id === action.payload);
            if (index !== -1) {
                state.ingredients.splice(index, 1);
                state.ingredients.splice(index + 1, 0, state.ingredients[index]);
            }
        },
        clearConstructor: (state) => {
            state.bun = null;
            state.ingredients = [];
        }
    }
});

export const { 
    addBun, 
    addIngredient, 
    removeIngredient, 
    moveIngredientUp, 
    moveIngredientDown, 
    clearConstructor 
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;