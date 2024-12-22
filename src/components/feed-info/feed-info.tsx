import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { getFeedsThunk } from '../../services/slices/FeedInfoSlice';
import { Preloader } from '@ui';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const dispatch = useDispatch();

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  const orders: TOrder[] = useSelector((state) => state.feedInfo.orders);
  const total = useSelector((state) => state.feedInfo.total);
  const totalToday = useSelector((state) => state.feedInfo.totalToday);
  const loading = useSelector((state) => state.feedInfo.loading);
  // const error = useSelector((state) => state.feedInfo.error);

  if (loading) {
    return <Preloader />;
  }

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  const feed = {
    total: total,
    totalToday: totalToday
  };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
