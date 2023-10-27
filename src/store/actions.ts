import {createAction} from '@reduxjs/toolkit';

export const fetchProductsListAction = createAction<{
  limit: number;
  skip: number;
}>('FETCH_PRODUCTS_LIST');
export const searchProductsAction = createAction<string>('SEARCH_PRODUCTS');
export const fetchCategoriesListAction = createAction('FETCH_CATEGORIES_LIST');
export const fetchProductsByCategoryAction = createAction<string>(
  'FETCH_PRODUCTS_BY_CATEGORY',
);
