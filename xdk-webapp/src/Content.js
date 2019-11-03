/**
 * Copyright (C)2019, Justin Nguyen
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Chart } from './Chart'

const styles = theme => ({
  content: {
    flexGrow: 1
  }
});

export const Content = props => {
  const { classes } = props
  return (
    <div className={classes.content}>
      <Grid container>
        <Grid item sm={12} md={6}>
          <Chart chartTitle="Temperature" data={props.temperatures} />
        </Grid>
        <Grid item sm={12} md={6}>
          <Chart chartTitle="Humidity" data={props.humidities} />
        </Grid>
        <Grid item sm={12} md={6}>
          <Chart chartTitle="Light" data={props.lights} />
        </Grid>
        <Grid item sm={12} md={6}>
          <Chart chartTitle="Air Pressure" data={props.pressures} />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Content);
