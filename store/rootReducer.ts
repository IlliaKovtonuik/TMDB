import { combineReducers } from "@reduxjs/toolkit";
import favoritesReducer from "@/slices/favoritesSlice";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["favorites"],
};

const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

export default persistReducer(persistConfig, rootReducer);
