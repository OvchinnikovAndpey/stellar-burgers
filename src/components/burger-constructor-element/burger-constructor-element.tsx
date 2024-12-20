import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';

import {
  moveIngredientDown,
  moveIngredientUp,
  clearConstructor,
  removeIngredient
} from '../../services/slices/BurgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    console.log('Ingredient:', ingredient);
    console.log('Index:', index);
    console.log('Total Items:', totalItems);
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        dispatch(moveIngredientDown(ingredient.id));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(moveIngredientUp(ingredient.id));
      }
    };

    const handleRemove = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleRemove} // Изменено на handleRemove
      />
    );
  }
);
