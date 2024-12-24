import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  closeOrder,
  getcurrentOrder,
  initiateOrder
} from '../../services/slices/OrderSlice';
import { RootState, useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const constructorItems = useSelector(
    (state: RootState) => state.burgerConstructor
  ) || { bun: null, ingredients: [] };

  const { isOrderLoading } = useSelector((state: RootState) => state.order);

  const orderModalData = useSelector(getcurrentOrder);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || isOrderLoading) {
      console.warn('Булка не выбрана или заказ уже загружается.');
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (ingredient: TConstructorIngredient) => ingredient._id
      ),
      constructorItems.bun._id
    ];

    console.log('Отправляемые ID ингредиентов:', ingredientIds);

    dispatch(initiateOrder(ingredientIds))
      .unwrap()
      .then((order) => {
        console.log('Заказ успешно отправлен:', order);
      })
      .catch((error) => {
        console.error('Ошибка при отправке заказа:', error);
      });
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  const closeOrderModal = () => {
    dispatch(closeOrder());
    navigate('/feed');
  };

  return (
    <div>
      <BurgerConstructorUI
        price={price}
        orderRequest={isOrderLoading}
        constructorItems={constructorItems}
        orderModalData={orderModalData}
        onOrderClick={onOrderClick}
        closeOrderModal={closeOrderModal}
      />
    </div>
  );
};