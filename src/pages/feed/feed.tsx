import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedsThunk } from '../../services/slices/FeedInfoSlice';
// import { useEffect } from 'react';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.order.isOrderHistoryLoading);
  const orders: TOrder[] =
    useSelector((state) => state.order.orderHistory) ?? [];

  // useEffect(() => {
  //   dispatch(getFeedsThunk());
  // }, [dispatch]);

  // if (loading || !orders.length) {
  //   return <Preloader />;
  // }

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


