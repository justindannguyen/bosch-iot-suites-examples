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
  Text
} from 'react-native'
import { updateLocationProperty } from './ThingApi'

export default class LocationComponent extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    const fallbackCoords = { latitude: 10.8018791, longitude: 106.6391644, accuracy : 0 }
    const geoOptions = { timeout: 20000, enableHighAccuracy: false, maximumAge: 1000 }
    navigator.geolocation.watchPosition(
      location => this.updateLocation(location.coords),
      error => this.updateLocation(fallbackCoords),
      geoOptions
    );
  }

  updateLocation(geoposition) {
    this.setState({ ...this.state, geoposition })
    updateLocationProperty(geoposition)
  }

  componentWillUnmount() {
    navigator.geolocation.stopObserving()
  }

  render() {
    const { geoposition } = this.state
    const lat = geoposition ? geoposition.latitude : 'na'
    const lng = geoposition ? geoposition.longitude : 'na'
    return (
      <Text style={styles.luxValue}>
        {`Location (${lat}, ${lng})`}
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

