import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ProductTypes {
  id: string;
  title: string;
  price: number;
  description: string;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  discountPercentage: number;
  stock: number;
}

interface LoadingStatusTypes {
  home: boolean;
  search: boolean;
}

export interface ProductSliceStateTypes {
  products: ProductTypes[];
  searchResults: ProductTypes[];
  categories: string[];
  productsByCategory: ProductTypes[];
  loadingStatus: LoadingStatusTypes;
}

const initialState: ProductSliceStateTypes = {
  products: [],
  searchResults: [],
  categories: [],
  productsByCategory: [],
  loadingStatus: {
    home: false,
    search: false,
  },
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
  setLoadingStatusAction,
} = productSlice.actions;
export default productSlice.reducer;
