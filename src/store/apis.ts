import {mainAxios} from './services';

export const fetchProductsListAPI = async () => {
  const {data} = await mainAxios.get('/products');

  return data;
};

export const searchProductsAPI = async (searchKey: string) => {
  const {data} = await mainAxios.get(`/products/search?q=${searchKey}`);

  return data;
};

export const fetchCategoriesListAPI = async () => {
  const {data} = await mainAxios.get('/products/categories');

  return data;
};

export const fetchProductsByCategoryAPI = async (category: string) => {
  const {data} = await mainAxios.get(`/products/category/${category}`);

  return data;
};
