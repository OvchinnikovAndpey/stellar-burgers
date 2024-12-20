import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderDetailsByNumber } from '../../services/slices/OrderSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = [];

  // if (!orders.length) {
  //   return <Preloader />;
  // }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
