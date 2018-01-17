import React, { Component } from 'react';
import { WebView, View } from 'react-native';
import { Container, Echarts } from './components'

export default class App extends Component {
  render() {
    return (
      <Container width={this.props.width} containerStyle={this.props.containerStyle}>
        <Echarts {...this.props} />
      </Container>
    );
  }
}
