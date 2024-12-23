import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { closeOrder } from '../../services/slices/OrderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Извлечение состояния с проверкой на undefined
  const constructorItems = useSelector(
    (state: RootState) => state.burgerConstructor
  ) || { bun: null, ingredients: [] };

  const { isOrderLoading } = useSelector((state: RootState) => state.order);

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || isOrderLoading) return;
    // Дополнительная логика для обработки заказа
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
