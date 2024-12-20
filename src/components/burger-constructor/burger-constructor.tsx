import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI, ModalUI, IngredientDetailsUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { useNavigate, useParams } from 'react-router-dom';
import { closeOrder } from '../../services/slices/OrderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Извлечение id из URL
  console.log(id);

  // Извлечение состояния с проверкой на undefined
  const constructorItems = useSelector(
    (state: RootState) => state.burgerConstructor
  ) || { bun: null, ingredients: [] };

  const { isOrderLoading } = useSelector((state: RootState) => state.order);

  // Извлечение данных ингредиента из состояния Redux
  const ingredientData = useSelector((state: RootState) =>
    state.ingredients.data.find((ingredient) => ingredient._id === id)
  );

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
      {id && ingredientData && (
        <ModalUI title='Детали ингредиента' onClose={() => navigate('/')}>
          <IngredientDetailsUI ingredientData={ingredientData} />
        </ModalUI>
      )}
    </div>
  );
};
