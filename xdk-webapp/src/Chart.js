/**
 * Copyright (C)2019, Justin Nguyen
 */
import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const Chart = props => {
  const options = {
    chart: {
      height: 300,
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
    series: [{
      showInLegend: false,
      data: props.data
    }]
  }

  return (<div>
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  </div>)
}
