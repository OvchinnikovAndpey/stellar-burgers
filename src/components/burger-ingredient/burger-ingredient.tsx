import { nanoid } from 'nanoid'; // Импорт nanoid
import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import {
  addBun,
  addIngredient
} from '../../services/slices/BurgerConstructorSlice';
import { useDispatch } from '../../services/store';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> =
  memo<TBurgerIngredientProps>(({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const transformToConstructorIngredient = (
      ingredient: TIngredient
    ): TConstructorIngredient => ({
      ...ingredient,
      id: nanoid() // Используем nanoid для генерации уникального ID
    });

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(addBun(transformToConstructorIngredient(ingredient)));
        return;
      }
      dispatch(addIngredient(transformToConstructorIngredient(ingredient)));
    };

    return (
      <>
        <BurgerIngredientUI
          ingredient={ingredient}
          count={count}
          locationState={{ background: location }}
          handleAdd={handleAdd}
        />
      </>
    );
  });
