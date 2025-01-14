import { Preloader } from '@ui';
import { TIngredient } from '@utils-types';
import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  selectIngredientsData,
  selectIngredientsError,
  selectIngredientsLoading
} from '../../services/slices/IngredientsSlice';
import { useDispatch, useSelector } from '../../services/store';
import { OrderCardUI } from '../ui/order-card';
import { OrderCardProps } from './type';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const ingredients: TIngredient[] = useSelector(selectIngredientsData);
  const ingredientsLoading = useSelector(selectIngredientsLoading);
  const ingredientsError = useSelector(selectIngredientsError);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt);
    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (ingredientsLoading) return <Preloader />;
  if (ingredientsError) return <div>Ошибка загрузки ингредиентов</div>;
  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});
