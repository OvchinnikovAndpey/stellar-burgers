import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid'; // Импорт nanoid

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import {
  addIngredient,
  addBun
} from '../../services/slices/BurgerConstructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export const BurgerIngredient: FC<TBurgerIngredientProps> =
  memo<TBurgerIngredientProps>(({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const transformToConstructorIngredient = (
      ingredient: TIngredient
    ): TConstructorIngredient => {
      return {
        ...ingredient,
        id: nanoid() // Используем nanoid для генерации уникального ID
      };
    };

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
