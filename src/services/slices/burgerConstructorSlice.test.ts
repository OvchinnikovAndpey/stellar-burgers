import reducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor,
  TBurgerConstructor
} from './BurgerConstructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { nanoid } from 'nanoid';

// Мокирование nanoid для предсказуемости
jest.mock('nanoid', () => ({
  nanoid: () => 'unique-id',
}));

describe('burgerConstructorSlice', () => {
  const initialState: TBurgerConstructor = { bun: null, ingredients: [] };

  it('должен обрабатывать addBun', () => {
    const bun: TIngredient = {
      _id: 'bun1',
      name: 'Bun',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 200,
      price: 50,
      image: 'image_url',
      image_large: 'image_large_url',
      image_mobile: 'image_mobile_url'
    };
    const action = addBun(bun);
    const state = reducer(initialState, action);
    expect(state.bun).toEqual(bun);
  });

  it('должен обрабатывать addIngredient', () => {
    const ingredient: TConstructorIngredient = {
      _id: 'ing1',
      id: 'ing1',
      name: 'Ingredient',
      type: 'sauce',
      proteins: 5,
      fat: 2,
      carbohydrates: 10,
      calories: 100,
      price: 20,
      image: 'image_url',
      image_large: 'image_large_url',
      image_mobile: 'image_mobile_url'
    };
    const action = addIngredient(ingredient);
    const state = reducer(initialState, action);
    expect(state.ingredients).toEqual([{ ...ingredient, id: 'unique-id' }]);
  });

  it('должен обрабатывать removeIngredient', () => {
    const stateWithIngredient = {
      ...initialState,
      ingredients: [{
        _id: 'ing1',
        id: 'unique-id',
        name: 'Ingredient',
        type: 'sauce',
        proteins: 5,
        fat: 2,
        carbohydrates: 10,
        calories: 100,
        price: 20,
        image: 'image_url',
        image_large: 'image_large_url',
        image_mobile: 'image_mobile_url'
      }]
    };
    const action = removeIngredient('unique-id');
    const state = reducer(stateWithIngredient, action);
    expect(state.ingredients).toEqual([]);
  });

  it('должен обрабатывать moveIngredientUp', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        {
          _id: 'ing1',
          id: 'id1',
          name: 'Ingredient1',
          type: 'sauce',
          proteins: 5,
          fat: 2,
          carbohydrates: 10,
          calories: 100,
          price: 20,
          image: 'image_url',
          image_large: 'image_large_url',
          image_mobile: 'image_mobile_url'
        },
        {
          _id: 'ing2',
          id: 'id2',
          name: 'Ingredient2',
          type: 'sauce',
          proteins: 5,
          fat: 2,
          carbohydrates: 10,
          calories: 100,
          price: 20,
          image: 'image_url',
          image_large: 'image_large_url',
          image_mobile: 'image_mobile_url'
        }
      ]
    };
    const action = moveIngredientUp('id2');
    const state = reducer(stateWithIngredients, action);
    expect(state.ingredients).toEqual([
      {
        _id: 'ing2',
        id: 'id2',
        name: 'Ingredient2',
        type: 'sauce',
        proteins: 5,
        fat: 2,
        carbohydrates: 10,
        calories: 100,
        price: 20,
        image: 'image_url',
        image_large: 'image_large_url',
        image_mobile: 'image_mobile_url'
      },
      {
        _id: 'ing1',
        id: 'id1',
        name: 'Ingredient1',
        type: 'sauce',
        proteins: 5,
        fat: 2,
        carbohydrates: 10,
        calories: 100,
        price: 20,
        image: 'image_url',
        image_large: 'image_large_url',
        image_mobile: 'image_mobile_url'
      }
    ]);
  });

  it('должен обрабатывать moveIngredientDown', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [
        {
          _id: 'ing1',
          id: 'id1',
          name: 'Ingredient1',
          type: 'sauce',
          proteins: 5,
          fat: 2,
          carbohydrates: 10,
          calories: 100,
          price: 20,
          image: 'image_url',
          image_large: 'image_large_url',
          image_mobile: 'image_mobile_url'
        },
        {
          _id: 'ing2',
          id: 'id2',
          name: 'Ingredient2',
          type: 'sauce',
          proteins: 5,
          fat: 2,
          carbohydrates: 10,
          calories: 100,
          price: 20,
          image: 'image_url',
          image_large: 'image_large_url',
          image_mobile: 'image_mobile_url'
        }
      ]
    };
    const action = moveIngredientDown('id1');
    const state = reducer(stateWithIngredients, action);
    expect(state.ingredients).toEqual([
      {
        _id: 'ing2',
        id: 'id2',
        name: 'Ingredient2',
        type: 'sauce',
        proteins: 5,
        fat: 2,
        carbohydrates: 10,
        calories: 100,
        price: 20,
        image: 'image_url',
        image_large: 'image_large_url',
        image_mobile: 'image_mobile_url'
      },
      {
        _id: 'ing1',
        id: 'id1',
        name: 'Ingredient1',
        type: 'sauce',
        proteins: 5,
        fat: 2,
        carbohydrates: 10,
        calories: 100,
        price: 20,
        image: 'image_url',
        image_large: 'image_large_url',
        image_mobile: 'image_mobile_url'
      }
    ]);
  });

  it('должен обрабатывать clearConstructor', () => {
    const stateWithBunAndIngredients = {
      bun: {
        _id: 'bun1',
        name: 'Bun',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 200,
        price: 50,
        image: 'image_url',
        image_large: 'image_large_url',
        image_mobile: 'image_mobile_url'
      },
      ingredients: [{
        _id: 'ing1',
        id: 'id1',
        name: 'Ingredient1',
        type: 'sauce',
        proteins: 5,
        fat: 2,
        carbohydrates: 10,
        calories: 100,
        price: 20,
        image: 'image_url',
        image_large: 'image_large_url',
        image_mobile: 'image_mobile_url'
      }]
    };
    const action = clearConstructor();
    const state = reducer(stateWithBunAndIngredients, action);
    expect(state).toEqual(initialState);
  });
});