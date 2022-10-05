import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import authSlice  from "./src/slicer/authReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from "@reduxjs/toolkit";
const persistConfig = {
	key: "root",
	version: 1,
	storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, authSlice)
export default configureStore({
  reducer: persistedReducer
})