import React from 'react';
import {TabNavigator, TabBarBottom} from 'react-navigation';
import UIPage from '../../../example/ui/index'
import BusinessPage from '../../../example/business/index'
import {TabBarItem} from '../../core/widget/index'

const Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
const scale = width / 375.0;


const TabNav = TabNavigator(
    {
        Home: {
            screen: UIPage,
            navigationOptions: {
                tabBarLabel: 'UI组件',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        showMessage={false}
                        focused={focused}
                        selectedImage={require('../../project/images/icon_work_selected.png')}
                        normalImage={require('../../project/images/icon_work.png')}
                    />
                )
            },
        },
        MailList: {
            screen: BusinessPage,
            navigationOptions: {
                tabBarLabel: '业务组件',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        showMessage={false}
                        focused={focused}
                        selectedImage={require('../../project/images/icon_maillist_selected.png')}
                        normalImage={require('../../project/images/icon_maillist.png')}
                    />
                )
            },
        }
    },
    {
        tabBarPosition: 'bottom', // 设置tabBar的位置
        tabBarComponent: TabBarBottom,
        swipeEnabled: true, //是否允许在标签之间进行滑动
        animationEnabled: false, //是否在更改标签时显示动画。
        lazy: true, //懒加载
        tabBarOptions: {
            activeBackgroundColor: 'white',
            activeTintColor: '#29a1f7',
            inactiveBackgroundColor: 'white',
            inactiveTintColor: '#999999',
            showLabel: true,
            style: {height: 55 * scale},
            labelStyle: {
                marginBottom: 5 * scale,
                fontSize: 10 * scale,
            }
        },
    }
);

export default TabNav;

