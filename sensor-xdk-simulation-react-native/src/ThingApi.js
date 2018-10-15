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

export const updateFeatureProperty = (featureId, data) => {
  const url = `https://things.s-apps.de1.bosch-iot-cloud.com/api/2/things/com.bosch.rbvh.energy%3AgalaxyNote8_1/features/${featureId}/properties`
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-cr-api-token': 'YOUR TOKEN',
      'Authorization': 'YOUR BASIC AUTH'
    },
    body: JSON.stringify(data)
  }).then(response => console.log('Success:', response))
    .catch(error => console.error('Error:', error));
}

export const updateLightingProperty = light => {
  updateFeatureProperty('xdk-sensors', { light })
}

export const updateLocationProperty = geoposition => {
  updateFeatureProperty('geolocation', { geoposition })
}

export const updateOrientationProperty = orientation => {
  updateFeatureProperty('orientation', { x : orientation.pitch, y : orientation.roll, z : orientation.azimuth })
}