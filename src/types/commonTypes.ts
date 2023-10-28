import {NavigationProp} from '@react-navigation/native';

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
  stock: number;
}

export interface LoadingStatusTypes {
  home: boolean;
  search: boolean;
}

export interface ProductSliceStateTypes {
  products: ProductTypes[];
  searchResults: ProductTypes[];
  categories: string[];
  productsByCategory: ProductTypes[];
  loadingStatus: LoadingStatusTypes;
  totalProducts: number;
}

/* An interface that extends another interface using the 'extends' keyword.
In this case, it extends 'Array<ProductTypes>', which means it represents an array
with elements of the 'ProductTypes' type and also includes 'products', 'total', 'limit',
and 'skip' */
export interface ProductListTypes extends Array<ProductTypes> {
  products: ProductTypes[];
  total: number;
  limit: number;
  skip: number;
}

export interface ChildrenTypes {
  children: React.ReactNode;
}

export interface NavigationTypes {
  navigation: NavigationProp<any, any>;
}

//Exclude<T, U>:  Useful when you want to exclude specific values from another type.
export interface RouteTypes {
  route: {
    params: Exclude<ProductTypes, 'id'>;
  };
}
