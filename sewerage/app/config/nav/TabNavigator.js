import React from 'react';
import {TabNavigator, TabBarBottom} from 'react-navigation';
import {TabBarItem  } from '../../project/components'
import * as Modules from '../../project/modules';
import * as Asserts from '../../project/assets';
import store from '../../project/redux/store/configStore';
import * as Actions from '../../project/redux/actions';

const Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
const scale = width / 375.0;

const TabNav = TabNavigator(
    {
        Work: {
            screen: Modules.WorkScreen,
            navigationOptions: {
                tabBarLabel: '工作',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        showMessage={false}
                        routeName='Work'
                        focused={focused}
                        selectedImage={Asserts.Home.work_selected}
                        normalImage={Asserts.Home.work}
                    />
                ),
                tabBarOnPress:({jumpToIndex,previousScene,scene})=>{
                    jumpToIndex(scene.index);
                    store.dispatch(Actions.setCurrentTab(scene.index,scene.route.routeName))
                }
            },
        },
        Message: {
            screen: Modules.MessageScreen,
            navigationOptions: {
                tabBarLabel: '消息',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        showMessage={false}
                        focused={focused}
                        routeName='Message'
                        selectedImage={Asserts.Home.message_selected}
                        normalImage={Asserts.Home.message}
                    />
                ),
                tabBarOnPress:({jumpToIndex,previousScene,scene})=>{
                    jumpToIndex(scene.index);
                    store.dispatch(Actions.setCurrentTab(scene.index,scene.route.routeName))
                }
            },
        },
        Me: {
            screen: Modules.MeScreen,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        showMessage={false}
                        focused={focused}
                        routeName='Me'
                        selectedImage={Asserts.Home.me_selected}
                        normalImage={Asserts.Home.me}
                    />
                ),
                tabBarOnPress:({jumpToIndex,previousScene,scene})=>{
                    jumpToIndex(scene.index);
                    store.dispatch(Actions.setCurrentTab(scene.index,scene.route.routeName))
                }
            },
        }
    },
    {
        tabBarPosition: 'bottom', // 设置tabBar的位置
        tabBarComponent: TabBarBottom,
        swipeEnabled: false, //是否允许在标签之间进行滑动
        animationEnabled: false, //是否在更改标签时显示动画。
        lazy: true, //懒加载
        tabBarOptions: {
            activeBackgroundColor: 'white',
            activeTintColor: '#42BD56',
            inactiveBackgroundColor: 'white',
            inactiveTintColor: '#999999',
            style: {
                height: 55 * scale
            },
            labelStyle: {
                marginBottom: 5 * scale,
                fontSize: 10 * scale,
            }
        },
    }
);

export default TabNav;

