describe('Конструктор', () => {
  const categoryBunSelector = '[data-testid=category-bun]';
  const categoryMainSelector = '[data-testid=category-main]';
  const categorySauceSelector = '[data-testid=category-sauce]';
  const modalsSelector = '[id=modals]';
  const buttonSelector = '[type=button]';

  beforeEach(() => {
    // Устанавливаем размер экрана для тестов
    cy.viewport(1920, 1080);
    // Переходим на главную страницу
    cy.visit('/');
    // Перехватываем запросы к API и подставляем фикстуры
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('fetchUser');

    // Устанавливаем куки и локальное хранилище для имитации авторизации
    cy.setCookie('accessToken', 'mockAccessToken');
    localStorage.setItem('refreshToken', 'testRefreshToken');
  });

  afterEach(() => {
    // Очищаем локальное хранилище и куки после каждого теста
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Добавление ингредиентов в конструктор бургеров', () => {
    it('должен добавить булочки в конструктор бургеров', () => {
      // Ждем загрузки ингредиентов
      cy.wait('@getIngredients');
      // Проверяем наличие текста "Выберите булки"
      cy.contains('Выберите булки').should('exist');
      // Добавляем булку в конструктор
      cy.get(categoryBunSelector).should('exist').contains('Добавить').click();
      // Проверяем, что булка добавлена в конструктор
      cy.get('.constructor-element_pos_top')
        .contains('Флюоресцентная булка R2-D3')
        .should('exist');
    });

    it('добавить ингредиенты в конструктор для бургеров', () => {
      // Ждем загрузки ингредиентов
      cy.wait('@getIngredients');
      // Проверяем наличие текста "Выберите начинку"
      cy.contains('Выберите начинку').should('exist');
      // Добавляем ингредиент в конструктор
      cy.get(categoryMainSelector).should('exist').contains('Добавить').click();
      // Проверяем, что ингредиент добавлен в конструктор
      cy.get('.constructor-element')
        .contains('Говяжий метеорит (отбивная)')
        .should('exist');
    });

    it('добавить соусы в конструктор для бургеров', () => {
      // Ждем загрузки ингредиентов
      cy.wait('@getIngredients');
      // Проверяем наличие текста "Выберите начинку"
      cy.contains('Выберите начинку').should('exist');
      // Добавляем соус в конструктор
      cy.get(categorySauceSelector).should('exist').contains('Добавить').click();
      // Проверяем, что соус добавлен в конструктор
      cy.get('.constructor-element')
        .contains('Соус с шипами Антарианского плоскоходца')
        .should('exist');
    });
  });

  describe('Ингредиенты в модальном окне', () => {
    it('показать и закрыть детали ингредиента', () => {
      // Ждем загрузки ингредиентов
      cy.wait('@getIngredients');
      // Открываем модальное окно с деталями ингредиента
      cy.get(categoryBunSelector).should('exist').find('li').first().click();
      // Проверяем, что модальное окно открыто
      cy.get(modalsSelector)
        .contains('Флюоресцентная булка R2-D3')
        .should('be.visible');
      // Закрываем модальное окно
      cy.get(modalsSelector).find('button').click().should('not.exist');
    });
  });

  describe('Обработка заказа', () => {
    it('показать пользователя в заголовке', () => {
      // Ждем загрузки данных пользователя
      cy.wait('@fetchUser');
      // Проверяем, что имя пользователя отображается в заголовке
      cy.get('header').contains('user').should('exist');
    });

    it('успешно создать заказ и очистить конструктор', () => {
      // Ждем загрузки ингредиентов
      cy.wait('@getIngredients');
      // Добавляем ингредиенты в конструктор
      cy.get(categoryBunSelector).should('exist').contains('Добавить').click();
      cy.get(categoryMainSelector).contains('Добавить').click();
      cy.get(categoryMainSelector).contains('Добавить').click();
      cy.get(categorySauceSelector).contains('Добавить').click();
      // Нажимаем кнопку "Оформить заказ"
      cy.get(buttonSelector).contains('Оформить заказ').click();

      // Ждем успешного ответа от сервера
      cy.wait('@createOrder')
        .its('response.statusCode')
        .should('eq', 200);

      // Проверяем, что модальное окно с номером заказа открыто
      cy.get(modalsSelector).contains('12345').should('be.visible');
      // Закрываем модальное окно
      cy.get(modalsSelector).find('button').click().should('not.exist');

      // Проверяем, что конструктор очищен после создания заказа
      cy.get('.constructor-element_pos_top').should('not.exist');
      cy.get('.constructor-element').should('not.exist');
    });
  });
});