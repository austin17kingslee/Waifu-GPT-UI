import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import logger from "redux-logger";
import thunk from "redux-thunk";
import { globalReducer } from "src/app/redux/global/globalSlice";
import { txReducer } from "src/app/redux/tx/txSlice";
import { accountReducer } from "src/app/redux/account/accountSlice";
import { isInDevelopment } from "src/app/utils/helpers";

const rootReducer = combineReducers({
  "tx": txReducer,
  "global": globalReducer,
  "account": persistReducer({
    key: 'account',
    storage: localStorage,
    whitelist: ['chainId', 'address', 'type']
  }, accountReducer),
});

// Export store.
let middlewares: any = [thunk];
const isDevEnv = isInDevelopment();
if (isDevEnv) middlewares.push(logger);
export const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
  devTools: isDevEnv,
});

// Export selectors.
export const selectTx = (state: RootState) => state.tx;
export const selectGlobal = (state: RootState) => state.global;
export const selectAccount = (state: RootState) => state.account;

// Export persistor.
export const persistor = persistStore(store);

// Export types.
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// Export hooks.
export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
