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

export interface ProductListTypes extends Array<ProductTypes> {
  products: ProductTypes[];
  total: number;
  limit: number;
  skip: number;
}

export interface childrenTypes {
  children: React.ReactNode;
}

export interface navigationProps {
  navigation: NavigationProp<any, any>;
}
