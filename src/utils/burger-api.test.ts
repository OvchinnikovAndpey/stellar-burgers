import { getIngredientsApi } from './burger-api';
import { TIngredientsResponse } from './burger-api';

// Мокаем глобальную функцию fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({ success: true, data: [{ id: 1, name: 'Bun' }] })
  })
) as jest.Mock;

describe('getIngredientsApi', () => {
  it('should return ingredients data when the response is successful', async () => {
    const data = await getIngredientsApi();
    expect(data).toEqual([{ id: 1, name: 'Bun' }]);
  });

  it('should reject with error data when the response is not successful', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ success: false, message: 'Error' })
      })
    );

    await expect(getIngredientsApi()).rejects.toEqual({
      success: false,
      message: 'Error'
    });
  });
});
