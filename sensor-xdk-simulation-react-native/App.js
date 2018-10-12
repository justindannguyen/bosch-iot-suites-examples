/**
 * Copyright (c) 2018-present, Justin Nguyen.
 * All rights reserved.
 * 
 * @author tuan3.nguyen@gmail.com
 * 
 * @flow
 * @format
 */
'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';

import LuxComponent from './src/LuxComponent'
import LocationComponent from './src/LocationComponent'
import OrientationComponent from './src/OrientationComponent'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LuxComponent />
        <LocationComponent />
        <OrientationComponent />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
