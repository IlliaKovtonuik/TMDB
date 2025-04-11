import { Slot } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator, View } from "react-native";
import { StatusBar } from "expo-status-bar";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        }
        persistor={persistor}
      >
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <Slot />
      </PersistGate>
    </Provider>
  );
}
