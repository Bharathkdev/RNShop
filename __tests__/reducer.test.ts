import productReducer from '../src/store/reducer';
import {
  setProductsAction,
  setSearchResultsAction,
  setCategoriesAction,
  setProductsByCategoryAction,
  setTotalProductsAction,
  setLoadingStatusAction,
} from '../src/store/reducer';
import {ProductTypes} from '../src/types/commonTypes';

const products: ProductTypes[] = [
  {
    id: '1',
    title: 'Product 1',
    price: 28.25,
    description: 'Description for Product 1',
    rating: 4.5,
    brand: 'Brand A',
    category: 'Category 1',
    thumbnail: 'product1.jpg',
    images: ['product1-1.jpg', 'product1-2.jpg', 'product1-3.jpg'],
    stock: 10,
  },
  {
    id: '2',
    title: 'Product 2',
    price: 39.99,
    description: 'Description for Product 2',
    rating: 4.2,
    brand: 'Brand B',
    category: 'Category 2',
    thumbnail: 'product2.jpg',
    images: ['product2-1.jpg', 'product2-2.jpg', 'product2-3.jpg'],
    stock: 5,
  },
];

const initialState = {
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

describe('Product Reducer', () => {
  it('should set products', () => {
    const action = setProductsAction(products);
    const newState = productReducer(initialState, action);
    expect(newState.products).toEqual(products);
  });

  it('should set search results', () => {
    const searchResults = products.slice(0, 2);
    const action = setSearchResultsAction(searchResults);
    const newState = productReducer(initialState, action);
    expect(newState.searchResults).toEqual(searchResults);
  });

  it('should set categories', () => {
    const categories = ['Category 1', 'Category 2'];
    const action = setCategoriesAction(categories);
    const newState = productReducer(initialState, action);
    expect(newState.categories).toEqual(categories);
  });

  it('should set products by category', () => {
    const action = setProductsByCategoryAction(products);
    const newState = productReducer(initialState, action);
    expect(newState.productsByCategory).toEqual(products);
  });

  it('should set total products', () => {
    const totalProducts = products.length;
    const action = setTotalProductsAction(totalProducts);
    const newState = productReducer(initialState, action);
    expect(newState.totalProducts).toEqual(totalProducts);
  });

  it('should set loading status', () => {
    const loadingStatus = {
      home: true,
      search: false,
    };
    const action = setLoadingStatusAction(loadingStatus);
    const newState = productReducer(initialState, action);
    expect(newState.loadingStatus).toEqual(loadingStatus);
  });
});
