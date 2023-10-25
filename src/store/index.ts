import createSagaMiddleware from 'redux-saga';
import {productSaga} from './sagas';
import {configureStore} from '@reduxjs/toolkit';
import productReducer from './reducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {product: productReducer},
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(productSaga);
