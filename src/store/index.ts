import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import {productSaga} from './sagas';
import productReducer from './reducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {product: productReducer},
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(productSaga);
