import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import {
  getOrderDetailsByNumber,
  ordersInfoDataSelector
} from '../../services/slices/OrderSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();
  const orderData = useSelector(ordersInfoDataSelector(number || ''));
  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.data
  );
  const isOrderLoading = useSelector(
    (state) => state.order.isOrderHistoryLoading
  );

  useEffect(() => {
    if (number) {
      dispatch(getOrderDetailsByNumber(+number));
    }
  }, [dispatch, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isOrderLoading) {
    return <Preloader />;
  }

  if (!orderInfo) {
    return <div>Order not found</div>;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
