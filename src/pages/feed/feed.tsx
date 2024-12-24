import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getFeedsThunk,
  getOrdersFeeds
} from '../../services/slices/FeedInfoSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.order.isOrderHistoryLoading);
  const orders: TOrder[] = useSelector(getOrdersFeeds);

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  if (loading || !orders.length) {
    return <Preloader />;
  }

  return (
    <>
      <FeedUI
        orders={orders}
        handleGetFeeds={() => {
          dispatch(getFeedsThunk());
        }}
      />
    </>
  );
};
