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
import { updateOrientationProperty } from './ThingApi'

export default class OrientationComponent extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    SensorManager.startOrientation(10000);
    DeviceEventEmitter.addListener('Orientation', (data) => {
      const orientation = {...data}
      this.setState({...this.state, orientation})
      // updateOrientationProperty(orientation)
    });
  }

  componentWillUnmount() {
    SensorManager.stopOrientation();
  }

  render() {
    const { orientation } = this.state
    const azimuth = orientation ? orientation.azimuth : 'na'
    const pitch = orientation ? orientation.pitch : 'na'
    const roll = orientation ? orientation.roll : 'na'
    return (
      <Text style={styles.luxValue}>
        {`Orientation (${azimuth}, ${pitch}, ${roll})`}
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

