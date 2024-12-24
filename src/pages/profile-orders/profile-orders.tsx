import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUserOrderHistory } from '../../services/slices/OrderSlice'; // Используем правильный thunk
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrderHistory()); // Получаем заказы конкретного пользователя
  }, [dispatch]);

  const orders: TOrder[] = useSelector(
    (state) => state.order.orderHistory || []
  ); // Получаем заказы из состояния

  return <ProfileOrdersUI orders={orders} />;
};
