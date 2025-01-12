import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from './BurgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types';
// test
describe('constructorSlice reducer', () => {
  const createIngredient = (id: string): TConstructorIngredient => ({
    id,
    _id: id,
    name: `ingredient-${id}`,
    type: 'main',
    price: 100,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    image: '',
    image_large: '',
    image_mobile: ''
  });

  const createInitialState = (
    ingredients: TConstructorIngredient[] = []
  ): { bun: null; ingredients: TConstructorIngredient[] } => ({
    bun: null,
    ingredients
  });

  it('вернуть начальное состояние', () => {
    const newState = constructorReducer(undefined, { type: '' });
    expect(newState).toEqual(createInitialState());
  });

  it('добавить ингредиент', () => {
    const initialState = createInitialState();
    const action = addIngredient(createIngredient('test-id'));

    const newState = constructorReducer(initialState, action);
    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients[0].id).toBeDefined();
    expect(newState.ingredients[0].id).not.toBe('');
    expect(newState.ingredients[0]._id).toBe('test-id');
    expect(newState.ingredients[0].id).not.toBe('test-id');
  });

  it('удалить ингредиент по id', () => {
    const ingredient = createIngredient('test-id');
    const initialState = createInitialState([ingredient]);
    const action = removeIngredient({ id: 'test-id' });
    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients.length).toBe(0);
  });

  it('переместить ингредиент вверх', () => {
    const ingredients = [createIngredient('1'), createIngredient('2')];
    const initialState = createInitialState(ingredients);
    const action = moveIngredientUp('2');
    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients[0].id).toBe('2');
  });

  it('переместить ингредиент вниз', () => {
    const ingredients = [createIngredient('1'), createIngredient('2')];
    const initialState = createInitialState(ingredients);
    const action = moveIngredientDown('1');
    const newState = constructorReducer(initialState, action);

    expect(newState.ingredients[0].id).toBe('2');
    expect(newState.ingredients[1].id).toBe('1');
  });

  it('сбросить конструктор', () => {
    const ingredients = [createIngredient('1'), createIngredient('2')];
    const initialState = createInitialState(ingredients);
    const action = clearConstructor();
    const newState = constructorReducer(initialState, action);

    expect(newState.bun).toBeNull();
    expect(newState.ingredients.length).toBe(0);
  });
});
