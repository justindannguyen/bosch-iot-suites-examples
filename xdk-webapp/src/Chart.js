/**
 * Copyright (C)2019, Justin Nguyen
 */
import React from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official';

export const Chart = props => {
  const options = {
    chart: {
      height: 320,
    },
    title: {
      text: props.chartTitle
    },
    xAxis: {
      type: 'datetime'
    },
    time: {
      useUTC: false
    },
    rangeSelector: {
      enabled: false
    },
    navigator: {
      enabled: false
    },
    scrollbar: {
      enabled: false
    },
    series: [{
      showInLegend: false,
      data: props.data
    }]
  }

  return (<div>
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
  </div>)
}
