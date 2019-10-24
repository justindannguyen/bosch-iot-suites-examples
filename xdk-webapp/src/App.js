import React, { Component } from 'react';
import './App.css';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import mqtt from 'mqtt'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.client = mqtt.connect('ws://52.221.181.230:15675/ws')
    this.client.on("connect", () => {
      console.log("connected");
      this.client.subscribe("telemetry");
    });
    this.client.on('message', (topic, message) => {
      this.handleJsonMessage(JSON.parse(message.toString()));
    })
  }

  handleJsonMessage = (json) => {
    this.setState({ ...json })
  }

  componentWillUnmount() {
    if (this.client)
      this.client.end()
  }

  render() {
    return (
      <div className="App" >
        <Chip avatar={<Avatar>C</Avatar>} label={this.state.temperature} />
        <Chip avatar={<Avatar>RH</Avatar>} label={this.state.humidity} />
        <Chip avatar={<Avatar>P</Avatar>} label={this.state.pressure} />
        <Chip avatar={<Avatar>Lx</Avatar>} label={this.state.lux} />
      </div>
    );
  }
}
export default App;
