// import echarts from './echarts.min';
import toString from '../../util/toString';
import {PixelRatio} from 'react-native';

export default function renderChart(props) {
  let height = props.height || 400;
  height = height;
  return `
    // console.log('hahahahaha');
    console.log(document.documentElement.clientHeight);
    console.log(window.innerHeight);
    document.getElementById('main').style.height = "${height}px";
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(${toString(props.option)});
  `
}
