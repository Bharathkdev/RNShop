import {Alert} from 'react-native';
import {call, put, debounce, takeLatest} from 'redux-saga/effects';
import {
  fetchCategoriesListAction,
  fetchProductsByCategoryAction,
  fetchProductsListAction,
  searchProductsAction,
} from './actions';
import {
  fetchCategoriesListAPI,
  fetchProductsByCategoryAPI,
  fetchProductsListAPI,
  searchProductsAPI,
} from './apis';
import {DEBOUNCE} from '../common/constants';
import {
  setProductsAction,
  setSearchResultsAction,
  setCategoriesAction,
  setProductsByCategoryAction,
  setLoadingStatusAction,
  ProductTypes,
} from './reducer';
import {strings} from '../common/strings';

export interface ProductsTypes {
  products: ProductTypes[];
}

const initialLoadingStatus = {
  home: false,
  search: false,
};

function* fetchProductsListSaga() {
  try {
    yield put(setLoadingStatusAction({...initialLoadingStatus, home: true}));
    const data: ProductsTypes = yield call(fetchProductsListAPI);

    yield put(setProductsAction(data.products));
  } catch (error: any) {
    const errorMessage = strings.ErrorHandling.productListError;
    console.error('Error in fetchProductsListSaga:', error);
    Alert.alert('Alert', errorMessage);
  } finally {
    yield put(setLoadingStatusAction({...initialLoadingStatus, home: false}));
  }
}

function* searchProductsSaga(action: {payload: string}) {
  try {
    yield put(setLoadingStatusAction({...initialLoadingStatus, search: true}));
    const data: ProductTypes[] = yield call(searchProductsAPI, action.payload);

    yield put(setSearchResultsAction(data));
  } catch (error: any) {
    const errorMessage = strings.ErrorHandling.searchProductError;
    console.error('Error in searchProductsSaga:', error);
    Alert.alert('Alert', errorMessage);
  } finally {
    yield put(setLoadingStatusAction({...initialLoadingStatus, search: false}));
  }
}

function* fetchCategoriesListSaga() {
  try {
    yield put(setLoadingStatusAction({...initialLoadingStatus, home: true}));
    const data: string[] = yield call(fetchCategoriesListAPI);

    yield put(setCategoriesAction(data));
  } catch (error: any) {
    const errorMessage = strings.ErrorHandling.productListError;
    console.error('Error in fetchCategoriesListSaga:', error);
    Alert.alert('Alert', errorMessage);
  } finally {
    yield put(setLoadingStatusAction({...initialLoadingStatus, home: false}));
  }
}

function* fetchProductsByCategorySaga(action: {payload: string}) {
  try {
    yield put(setLoadingStatusAction({...initialLoadingStatus, home: true}));
    const data: ProductTypes[] = yield call(
      fetchProductsByCategoryAPI,
      action.payload,
    );

    yield put(setProductsByCategoryAction(data));
  } catch (error: any) {
    const errorMessage = strings.ErrorHandling.productListError;
    console.error('Error in fetchProductsByCategorySaga:', error);
    Alert.alert('Alert', errorMessage);
  } finally {
    yield put(setLoadingStatusAction({...initialLoadingStatus, home: false}));
  }
}

export function* productSaga() {
  yield takeLatest(fetchProductsListAction, fetchProductsListSaga);
  yield debounce(DEBOUNCE, searchProductsAction, searchProductsSaga);
  yield takeLatest(fetchCategoriesListAction, fetchCategoriesListSaga);
  yield takeLatest(fetchProductsByCategoryAction, fetchProductsByCategorySaga);
}
