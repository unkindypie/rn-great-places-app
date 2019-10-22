import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { StyleSheet, Text, View } from 'react-native';

import PlacesNavigator from './navigation/PlacesNavigation';
import placerReducer from './store/places-reducer';

const roodReducer = combineReducers({
  places: placerReducer
});

const store = createStore(roodReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

