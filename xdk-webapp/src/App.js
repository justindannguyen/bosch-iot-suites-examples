import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Content from './Content'
import Header from './Header'

import mqtt from 'mqtt'

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.client = mqtt.connect('ws://18.140.241.253:15675/ws')
    this.client.on("connect", () => {
      console.log("connected");
      this.client.subscribe("telemetry");
    });
    this.client.on('message', (topic, message) => {
      this.handleJsonMessage(JSON.parse(message.toString()));
    })
  }

  handleJsonMessage = (json) => {
    const temperatures = this.state.temperatures || []
    const humidities = this.state.humidities || []
    const lights = this.state.lights || []
    const pressures = this.state.pressures || []
    const time = Date.now();
    temperatures.push([time, json.temperature || 0])
    humidities.push([time, json.humidity || 0])
    lights.push([time, json.lux || 0])
    pressures.push([time, json.pressure || 0])
    this.setState({
      data: { ...json },
      temperatures,
      humidities,
      pressures,
      lights
    })
  }

  componentWillUnmount() {
    if (this.client) {
      this.client.end()
    }
  }

  render() {
    const { classes } = this.props;
    const data = this.state.data || {}
    const temperatures = this.state.temperatures || []
    const humidities = this.state.humidities || []
    const lights = this.state.lights || []
    const pressures = this.state.pressures || []
    return (
      <div className={classes.root}>
        <Header data={data} />
        <Content temperatures={temperatures}
          lights={lights}
          pressures={pressures}
          humidities={humidities} />
      </div>
    );
  }
}
export default withStyles(styles)(App);
