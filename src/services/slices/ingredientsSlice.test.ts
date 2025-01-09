import ingredientsReducer, {
  getIngredients,
  selectIngredientsData,
  selectIngredientsLoading,
  selectIngredientsError
} from './IngredientsSlice';
import { TIngredient } from '@utils-types';
import { IIngredientsState } from './IngredientsSlice';

const initialState: IIngredientsState = {
  data: [] as TIngredient[],
  loading: false,
  error: false
};

describe('ingredientsSlice reducer', () => {
  it('возвращает начальное состояние', () => {
    const newState = ingredientsReducer(undefined, { type: '' });
    expect(newState).toEqual(initialState);
  });

  it('устанавливает loading в true при pending', () => {
    const action = { type: getIngredients.pending.type };
    const newState = ingredientsReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(false);
  });

  it('устанавливает data и loading в false при fulfilled', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: 'test-id',
        name: 'test-ingredient',
        type: 'main',
        price: 100,
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 150,
        image: 'image-url',
        image_mobile: 'image-mobile-url',
        image_large: 'image-large-url'
      }
    ];

    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };

    const newState = ingredientsReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.data).toEqual(mockIngredients);
    expect(newState.error).toBe(false);
  });

  it('устанавливает error и loading в false при rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Произошла ошибка' }
    };

    const newState = ingredientsReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(true);
  });

  // Тесты для селекторов
  it('должен возвращать data с помощью selectIngredientsData', () => {
    const state = {
      ingredients: {
        ...initialState,
        data: [
          {
            _id: 'test-id',
            name: 'test-ingredient',
            type: 'main',
            price: 100,
            proteins: 10,
            fat: 5,
            carbohydrates: 20,
            calories: 150,
            image: 'image-url',
            image_mobile: 'image-mobile-url',
            image_large: 'image-large-url'
          }
        ]
      }
    };
    expect(selectIngredientsData(state)).toEqual(state.ingredients.data);
  });

  it('должен возвращать loading с помощью selectIngredientsLoading', () => {
    const state = {
      ingredients: {
        ...initialState,
        loading: true
      }
    };
    expect(selectIngredientsLoading(state)).toBe(true);
  });

  it('должен возвращать error с помощью selectIngredientsError', () => {
    const state = {
      ingredients: {
        ...initialState,
        error: true
      }
    };
    expect(selectIngredientsError(state)).toBe(true);
  });
});
