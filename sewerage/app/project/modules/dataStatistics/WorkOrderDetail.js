/** 
 * Created by Infore.Wlun. 
 */

 import React, { Component } from 'react' 
 import {
    View
 } from "react-native"
 import {WrapScreen} from '../wrap'

 class WorkOrderDetailScreen extends WrapScreen {
     constructor(props){
         super(props)
         this.header = {
             title:'故障工单详情'
         }
     }
 
     _render(){
         return(
             <View>
                 
             </View>
         )
     } 
 }

export default WorkOrderDetailScreen;