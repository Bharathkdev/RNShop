import {Alert} from 'react-native';
import {call, put, debounce, takeLatest, select} from 'redux-saga/effects';
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
  setTotalProductsAction,
} from './reducer';
import {strings} from '../common/strings';
import {ProductListTypes} from '../types/ReducerTypes';

const initialLoadingStatus = {
  home: false,
  search: false,
};

function* fetchProductsListSaga(action: {
  payload: {limit: number; skip: number};
}): Generator<any, void, ProductListTypes> {
  try {
    yield put(setLoadingStatusAction({...initialLoadingStatus, home: true}));
    const limit = action.payload.limit;
    const existingProducts = yield select(state => state.product.products);
    const page = Math.ceil(existingProducts.length / limit) + 1;

    const offset = (page - 1) * limit;
    const data: ProductListTypes = yield call(fetchProductsListAPI, {
      limit,
      offset,
    });

    const updatedProducts = existingProducts.concat(data.products);

    yield put(setProductsAction(updatedProducts));
    yield put(setTotalProductsAction(data.total));
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
    const data: ProductListTypes = yield call(
      searchProductsAPI,
      action.payload,
    );

    yield put(setSearchResultsAction(data.products));
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
    yield put(setLoadingStatusAction({...initialLoadingStatus, search: true}));
    const data: string[] = yield call(fetchCategoriesListAPI);

    yield put(setCategoriesAction(data));
  } catch (error: any) {
    const errorMessage = strings.ErrorHandling.productListError;
    console.error('Error in fetchCategoriesListSaga:', error);
    Alert.alert('Alert', errorMessage);
  } finally {
    yield put(setLoadingStatusAction({...initialLoadingStatus, search: false}));
  }
}

function* fetchProductsByCategorySaga(action: {payload: string}) {
  try {
    yield put(setLoadingStatusAction({...initialLoadingStatus, search: true}));
    const data: ProductListTypes = yield call(
      fetchProductsByCategoryAPI,
      action.payload,
    );

    yield put(setProductsByCategoryAction(data.products));
  } catch (error: any) {
    const errorMessage = strings.ErrorHandling.productListError;
    console.error('Error in fetchProductsByCategorySaga:', error);
    Alert.alert('Alert', errorMessage);
  } finally {
    yield put(setLoadingStatusAction({...initialLoadingStatus, search: false}));
  }
}

export function* productSaga() {
  yield takeLatest(fetchProductsListAction, fetchProductsListSaga);
  yield debounce(DEBOUNCE, searchProductsAction, searchProductsSaga);
  yield takeLatest(fetchCategoriesListAction, fetchCategoriesListSaga);
  yield takeLatest(fetchProductsByCategoryAction, fetchProductsByCategorySaga);
}
