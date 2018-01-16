// import echarts from './echarts.min';
import toString from '../../util/toString';
import {PixelRatio} from 'react-native';

export default function renderChart(props) {
  let height = props.height || 400;
  height = height * PixelRatio.get();
  return `
    document.getElementById('main').style.height = "${height}pt";
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(${toString(props.option)});
  `
}
