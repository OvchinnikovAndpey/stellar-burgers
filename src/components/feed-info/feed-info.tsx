import { FC } from 'react';
import { useSelector } from '../../services/store';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] => {
  const toLowerCaseStatus = status.toLowerCase();

  const filteredOrders = orders.filter(
    (item) => item.status === toLowerCaseStatus
  );

  return filteredOrders.map((item) => item.number).slice(0, 20);
};

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const orders: TOrder[] = useSelector((state) => state.feedInfo.orders);
  const feed = useSelector<{ total: number; totalToday: number }>((state) => ({
    total: state.feedInfo.total,
    totalToday: state.feedInfo.totalToday
  }));

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
