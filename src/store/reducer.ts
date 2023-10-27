import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ProductSliceStateTypes,
  ProductTypes,
  LoadingStatusTypes,
} from '../types/ReducerTypes';

const initialState: ProductSliceStateTypes = {
  products: [],
  searchResults: [],
  categories: [],
  productsByCategory: [],
  loadingStatus: {
    home: false,
    search: false,
  },
  totalProducts: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductsAction: (state, action: PayloadAction<ProductTypes[]>) => {
      state.products = action.payload;
    },
    setSearchResultsAction: (state, action: PayloadAction<ProductTypes[]>) => {
      state.searchResults = action.payload;
    },
    setCategoriesAction: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setProductsByCategoryAction: (
      state,
      action: PayloadAction<ProductTypes[]>,
    ) => {
      state.productsByCategory = action.payload;
    },
    setTotalProductsAction: (state, action: PayloadAction<number>) => {
      state.totalProducts = action.payload;
    },
    setLoadingStatusAction: (
      state,
      action: PayloadAction<LoadingStatusTypes>,
    ) => {
      state.loadingStatus = action.payload;
    },
  },
});

export const {
  setProductsAction,
  setSearchResultsAction,
  setCategoriesAction,
  setProductsByCategoryAction,
  setTotalProductsAction,
  setLoadingStatusAction,
} = productSlice.actions;

export default productSlice.reducer;
