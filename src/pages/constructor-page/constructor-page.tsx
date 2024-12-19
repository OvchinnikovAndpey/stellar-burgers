import { useDispatch, useSelector } from '../../services/store';
import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { getIngredients } from '../../services/slices/IngredientsSlice';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();

  // Достаем статус загрузки и ошибки из Redux store
  const isIngredientsLoading = useSelector(
    (state) => state.ingredients.loading
  );
  const hasError = useSelector((state) => state.ingredients.error);
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
