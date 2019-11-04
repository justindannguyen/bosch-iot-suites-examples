/**
 * Copyright (C)2019, Justin Nguyen
 */

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import WbIncandescentOutlinedIcon from '@material-ui/icons/WbIncandescentOutlined';
import Button from '@material-ui/core/Button';
import Logo from './logo.png';

const styles = theme => ({
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,

  },
  chip: {
    width: 80,
    margin: 2
  },
  lightStatus: {
    [theme.breakpoints.up('md')]: {
      marginLeft: 80
    },
    fontSize: 60
  }
});


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onButtonClick = () => {
    this.switchLightStatus()
  }

  switchLightStatus = () => {
    fetch("http://18.140.241.253/xdk/lightStatus", { method: "POST" })
      .then(response => {
        console.log("Successfull");
      }).catch(error => {
        console.log(`Error occured when switch light status: ${error}`)
      })
  }

  componentDidUpdate() {
    const { lux, lightStatus } = this.props.data

    if (lux <= 10 && lightStatus === 0) {
      // Light is off and too dark
      this.switchLightStatus();
    } else if (lux >= 100 && lightStatus === 1) {
      // Light is on and too bright
      this.switchLightStatus();
    }
  }

  render() {
    const { classes, data } = this.props
    const { lightStatus } = data;
    const lightColor = lightStatus === 1 ? "secondary" : "disabled";
    const buttonText = lightStatus === 1 ? "Light OFF" : "Light ON";
    return (
      <AppBar>
        <Toolbar>
          <IconButton href="http://justindannguyen.com" edge="start" className={classes.menuButton}>
            <img alt='Logo' src={Logo} style={{ width: 40 }} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Bosch XDK
          </Typography>
          <Chip className={classes.chip} avatar={<Avatar>°C</Avatar>} label={data.temperature} />
          <Chip className={classes.chip} avatar={<Avatar>Rh%</Avatar>} label={data.humidity} />
          <Chip className={classes.chip} avatar={<Avatar>Pa</Avatar>} label={data.pressure} />
          <Chip className={classes.chip} avatar={<Avatar>Lx</Avatar>} label={data.lux} />
          <WbIncandescentOutlinedIcon className={classes.lightStatus} color={lightColor} />
          <Button onClick={this.onButtonClick} variant="contained" color="secondary">
            {buttonText}
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header);