import { configureStore, createStore } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import authSlice  from "./src/slicer/authReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from "@reduxjs/toolkit";
const persistConfig = {
	key: "root",
	storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, authSlice)

const store = createStore(persistedReducer); // 5. create persisted store
const persistor = persistStore(store) // 6. create the store persistor

export { store, persistor }; 