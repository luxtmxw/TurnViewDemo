/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var TurnView = require('./TurnView');
export default class TurnViewDemo extends Component {
  render() {
    return (
      <TurnView />
    );
  }
}


AppRegistry.registerComponent('TurnViewDemo', () => TurnViewDemo);
