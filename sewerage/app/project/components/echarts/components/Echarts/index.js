import React, { Component } from 'react';
import { WebView, View, StyleSheet,ActivityIndicator } from 'react-native';
import renderChart from './renderChart';
// import echarts from './echarts.min';

export default class App extends Component {
    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(nextProps.option) !== JSON.stringify(this.props.option)){
            this.refs.chart.reload();
        }
    }

    reload=()=>{
        this.refs['chart'].reload();
    }

    render() {
        let source;
        if (__DEV__) {
            source = require('./tpl.html');
        } else {
            source = _IOS_ ? require('./tpl.html') : { uri: 'file:///android_asset/static/tpl.html' };
        }
        return (
            <View style={{ flex: 1, height: this.props.height || 400, }}>
                <WebView
                    ref="chart"
                    scrollEnabled={false}
                    injectedJavaScript={renderChart(this.props)}
                    startInLoadingState={true}
                    renderLoading={()=>{
                        return (
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <ActivityIndicator size='small'/>
                            </View>
                        )
                    }}
                    style={{
                        height: this.props.height || 400,
                    }}
                    source={source}
                />
            </View>
        );
    }
}
