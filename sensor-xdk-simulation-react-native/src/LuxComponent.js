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
  DeviceEventEmitter
} from 'react-native';

import { SensorManager } from 'NativeModules'
import { updateLightingProperty } from './ThingApi'

export default class LuxComponent extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    SensorManager.startLightSensor(100);
    DeviceEventEmitter.addListener('LightSensor', data => {
      const lux = data ? data.light : 0
      this.setState({ ...this.state, lux })
      console.log(updateLightingProperty)
      updateLightingProperty(lux)
    });
  }

  componentWillUnmount() {
    SensorManager.stopLightSensor()
  }

  render() {
    return (
      <Text style={styles.luxValue}>
        {this.state.lux + " Lux"}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  luxValue: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

