import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types'; // Импортируйте тип TIngredient

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  const ingredientData = useSelector(
    (state: { ingredients: { data: TIngredient[] } }) =>
      state.ingredients.data?.find((item: TIngredient) => item._id === id)
  );
  // Почему не открывается модальное окно

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
