import {ProductListTypes} from '../types/commonTypes';
import {mainAxios} from './services';

export const fetchProductsListAPI = async ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}): Promise<ProductListTypes> => {
  // Sending limit and skip values for pagination
  const {data} = await mainAxios.get(`/products?limit=${limit}&skip=${offset}`);

  return data;
};

export const searchProductsAPI = async (
  searchKey: string,
): Promise<ProductListTypes> => {
  const {data} = await mainAxios.get(`/products/search?q=${searchKey}`);

  return data;
};

export const fetchCategoriesListAPI = async (): Promise<string[]> => {
  const {data} = await mainAxios.get('/products/categories');

  return data;
};

export const fetchProductsByCategoryAPI = async (
  category: string,
): Promise<ProductListTypes> => {
  const {data} = await mainAxios.get(`/products/category/${category}`);

  return data;
};
